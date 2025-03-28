package com.quizapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.model.QuizResult;
import com.quizapp.service.QuizResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class QuizResultController {
    
	@Autowired
    private QuizResultService quizResultService;

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getResultsByUsername(@PathVariable("username") String username) {
        return quizResultService.getResultsByUsername(username);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<QuizResult>> getResultsByQuizId(@PathVariable("quizId") Long quizId) {
        return ResponseEntity.ok(quizResultService.getResultsByQuizId(quizId));
    }
    
    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody Map<String, Object> request) {
        return quizResultService.submitQuiz(request);
    }
}
