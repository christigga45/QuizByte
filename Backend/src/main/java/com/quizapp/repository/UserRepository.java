package com.quizapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username); 
    
}
