package com.quizapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizapp.model.Question;
import com.quizapp.model.Quiz;
import com.quizapp.model.QuizResult;
import com.quizapp.model.QuizResultDTO;
import com.quizapp.model.User;
import com.quizapp.repository.QuestionRepository;
import com.quizapp.repository.QuizRepository;
import com.quizapp.repository.QuizResultRepository;
import com.quizapp.repository.UserRepository;

@Service
public class QuizResultServiceImpl implements QuizResultService {
    
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizResultServiceImpl(
        QuizResultRepository quizResultRepository,
        UserRepository userRepository,
        QuizRepository quizRepository,
        QuestionRepository questionRepository
    ) {
        this.quizResultRepository = quizResultRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public List<QuizResult> getResultsByUserId(Long userId) {
        return quizResultRepository.findByUserId(userId);
    }

    @Override
    public List<QuizResult> getResultsByQuizId(Long quizId) {
        return quizResultRepository.findByQuizId(quizId);
    }

    @Override
    public QuizResult saveResult(QuizResult result) {
        return quizResultRepository.save(result);
    }

    @Override
    public ResponseEntity<?> getResultsByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        List<QuizResult> results = quizResultRepository.findByUserId(user.getId());
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (QuizResult result : results) {
            Map<String, Object> resultData = new HashMap<>();
            resultData.put("quizTitle", result.getQuiz().getTitle());
            resultData.put("score", result.getScore());
            resultData.put("attemptTime", result.getAttemptTime());
            responseList.add(resultData);
        }

        return ResponseEntity.ok(responseList);
    }

    @Override
    public ResponseEntity<?> submitQuiz(Map<String, Object> request) {
        try {
            if (!request.containsKey("answers") || !request.containsKey("username") || !request.containsKey("quizId")) {
                return ResponseEntity.badRequest().body("Invalid request! Required fields missing.");
            }

            String username = request.get("username").toString();
            Long quizId = Long.parseLong(request.get("quizId").toString());
            Map<String, String> answers = (Map<String, String>)request.get("answers");

            User user = userRepository.findByUsername(username);
            Quiz quiz = quizRepository.findById(quizId).orElse(null);

            if (user == null || quiz == null) {
                return ResponseEntity.badRequest().body("User or Quiz not found!");
            }

            int correctAnswers = 0;
            int totalQuestions = answers.size();
            List<Question> questions = questionRepository.findAll();

            for (Map.Entry<String, String> entry : answers.entrySet()) {
                Long questionId = Long.parseLong(entry.getKey());
                String selectedAnswer = entry.getValue();
                
                for (int i = 0; i < questions.size(); i++) {
                    Question question = questions.get(i);
                    if (question.getId().equals(questionId) && selectedAnswer.equals(question.getCorrectAnswer())) {
                        correctAnswers++;
                        break;
                    }
                }
            }

            int score = (correctAnswers * 100) / totalQuestions;

            QuizResult quizResult = new QuizResult();
            quizResult.setUser(user);
            quizResult.setUsername(user.getUsername());
            quizResult.setQuiz(quiz);
            quizResult.setScore(score);
            quizResult.setAttemptTime(LocalDateTime.now());
            quizResultRepository.save(quizResult);

            QuizResultDTO response = new QuizResultDTO(user.getId(), quizId, score);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing quiz submission!");
        }
    }

    @Transactional
    public void deleteQuiz(Long quizId) {
        quizResultRepository.deleteByQuizId(quizId);
        quizRepository.deleteById(quizId);
    }
}
