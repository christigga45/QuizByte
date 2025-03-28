package com.quizapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizapp.model.Quiz;
import com.quizapp.model.QuizDTO;
import com.quizapp.service.QuizService;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {
	
	@Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable("id") Long id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }

    @DeleteMapping("/quiz/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable("quizId") Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.ok("Quiz deleted successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable("id") Long id, @RequestBody Quiz updatedQuiz) {
        Optional<Quiz> updatedQuizOpt = quizService.updateQuiz(id, updatedQuiz);
        return updatedQuizOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
