package com.quizapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.quizapp.model.QuizResult;


public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
	List<QuizResult> findByUserId(Long userId);
    List<QuizResult> findByQuizId(Long quizId);
   
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM quiz_results WHERE quiz_id = :quizId", nativeQuery = true)
    void deleteByQuizId(@Param("quizId") Long quizId);


}
