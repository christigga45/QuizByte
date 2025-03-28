package com.quizapp.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.quizapp.model.QuizResult;

public interface QuizResultService {
    List<QuizResult> getResultsByUserId(Long userId);
    List<QuizResult> getResultsByQuizId(Long quizId);
    QuizResult saveResult(QuizResult result);
    ResponseEntity<?> getResultsByUsername(String username);
    ResponseEntity<?> submitQuiz(Map<String, Object> request);
}
