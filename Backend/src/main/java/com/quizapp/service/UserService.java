package com.quizapp.service;

import com.quizapp.model.User;

public interface UserService {
    User registerUser(User user);
    User getUserByUsername(String username);
	User getUserById(Long userId);
	boolean loginUser(String username, String password);
}
