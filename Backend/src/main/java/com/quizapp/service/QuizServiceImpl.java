package com.quizapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.model.Question;
import com.quizapp.model.Quiz;
import com.quizapp.model.QuizDTO;
import com.quizapp.repository.QuizRepository;
import com.quizapp.repository.QuizResultRepository;

@Service
public class QuizServiceImpl implements QuizService {
    
    @Autowired
    private final QuizRepository quizRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    public QuizServiceImpl(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public List<QuizDTO> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        List<QuizDTO> quizDTOs = new ArrayList<>();
        
        for (Quiz quiz : quizzes) {
            quizDTOs.add(new QuizDTO(quiz.getId(), quiz.getTitle(), quiz.getDescription()));
        }
        
        return quizDTOs;
    }

    @Override
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    @Override
    public Quiz createQuiz(Quiz quiz) {
        if (quiz.getQuestions() != null) {
            for (Question question : quiz.getQuestions()) {
                question.setQuiz(quiz); // Link question to quiz
            }
        }
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        quizResultRepository.deleteByQuizId(id); // First delete related quiz results
        quizRepository.deleteById(id);
    }

    @Override
    public Optional<Quiz> updateQuiz(Long id, Quiz updatedQuiz) {
        Optional<Quiz> existingQuizOpt = quizRepository.findById(id);

        if (existingQuizOpt.isPresent()) {
            Quiz existingQuiz = existingQuizOpt.get();
            existingQuiz.setTitle(updatedQuiz.getTitle());
            existingQuiz.setDescription(updatedQuiz.getDescription());

            List<Question> updatedQuestions = new ArrayList<>();

            for (Question newQuestion : updatedQuiz.getQuestions()) {
                if (newQuestion.getId() == null) {
                    // New question, add to quiz
                    newQuestion.setQuiz(existingQuiz);
                    updatedQuestions.add(newQuestion);
                } else {
                    // Update existing question using traditional loop
                    for (Question existingQuestion : existingQuiz.getQuestions()) {
                        if (existingQuestion.getId().equals(newQuestion.getId())) {
                            existingQuestion.setQuestionText(newQuestion.getQuestionText());
                            existingQuestion.setOption1(newQuestion.getOption1());
                            existingQuestion.setOption2(newQuestion.getOption2());
                            existingQuestion.setOption3(newQuestion.getOption3());
                            existingQuestion.setOption4(newQuestion.getOption4());
                            existingQuestion.setCorrectAnswer(newQuestion.getCorrectAnswer());
                            updatedQuestions.add(existingQuestion);
                            break;
                        }
                    }
                }
            }

            existingQuiz.setQuestions(updatedQuestions);
            quizRepository.save(existingQuiz);
            return Optional.of(existingQuiz);
        } else {
            return Optional.empty();
        }
    }
}
