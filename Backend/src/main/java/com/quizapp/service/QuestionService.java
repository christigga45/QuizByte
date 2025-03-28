package com.quizapp.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.quizapp.model.Question;

public interface QuestionService {
    ResponseEntity<Map<String, Object>> getQuizDetails(Long quizId);
    ResponseEntity<?> saveQuestion(Map<String, Object> request);
    ResponseEntity<?> createQuestion(Long quizId, Map<String, Object> request);
    List<Question> getQuestionsByQuizId(Long quizId);
}
