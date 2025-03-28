package com.quizapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizapp.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
	
	@Autowired
    private QuestionService questionService;

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<Map<String, Object>> getQuizDetails(@PathVariable("quizId") Long quizId) {
        return questionService.getQuizDetails(quizId);
    }

    @PostMapping("/quiz/{quizId}")
    public ResponseEntity<?> createQuestion(@PathVariable("quizId") Long quizId, @RequestBody Map<String, Object> request) {
        return questionService.createQuestion(quizId, request);
    }
}
