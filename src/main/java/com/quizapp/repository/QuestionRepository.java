package com.quizapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizapp.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	List<Question> findByQuizId(Long quizId);
}
