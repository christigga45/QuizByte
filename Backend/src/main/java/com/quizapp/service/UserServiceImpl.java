package com.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.model.User;
import com.quizapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

	@Override
	public User getUserById(Long userId) {
		return userRepository.findById(userId).get();
		
	}
	
	@Override
    public boolean loginUser(String username, String password) {
        // Check if it's the default admin credentials
        if ("admin".equals(username) && "123".equals(password)) {
            return true;
        }

        // Check the database for the user
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
