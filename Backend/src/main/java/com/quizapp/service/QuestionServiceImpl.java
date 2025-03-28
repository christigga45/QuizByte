package com.quizapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quizapp.model.Question;
import com.quizapp.model.Quiz;
import com.quizapp.repository.QuestionRepository;
import com.quizapp.repository.QuizRepository;

@Service
public class QuestionServiceImpl implements QuestionService {
	
	@Autowired
    private QuestionRepository questionRepository;
	
	@Autowired
    private QuizRepository quizRepository;

    

    @Override
    public ResponseEntity<Map<String, Object>> getQuizDetails(Long quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Quiz quiz = quizOptional.get();
        Map<String, Object> response = new HashMap<>();
        response.put("title", quiz.getTitle());
        response.put("questions", getQuestionsByQuizId(quizId));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> saveQuestion(Map<String, Object> request) {
        try {
            Question question = new Question();
            question.setQuestionText(request.get("text").toString());
            question.setCorrectAnswer(request.get("correctAnswer").toString());
            return ResponseEntity.ok(questionRepository.save(question));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request data");
        }
    }

    @Override
    public ResponseEntity<?> createQuestion(Long quizId, Map<String, Object> request) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
        }

        try {
            Quiz quiz = quizOptional.get();
            Question question = new Question();
            question.setQuestionText(request.get("text").toString());
            question.setCorrectAnswer(request.get("correctAnswer").toString());
            question.setQuiz(quiz);
            return ResponseEntity.ok(questionRepository.save(question));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request data");
        }
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }
}
