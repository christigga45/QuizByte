package com.quizapp.service;

import java.util.List;
import java.util.Optional;

import com.quizapp.model.Quiz;
import com.quizapp.model.QuizDTO;

public interface QuizService {
    List<QuizDTO> getAllQuizzes();
    Optional<Quiz> getQuizById(Long id);
    Quiz createQuiz(Quiz quiz);
    void deleteQuiz(Long id);
    Optional<Quiz> updateQuiz(Long id, Quiz updatedQuiz);
}
