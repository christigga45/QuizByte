package com.quizapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.model.User;
import com.quizapp.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")  // Allow frontend access
public class UserController {
	@Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User request) {
        boolean isValidUser = userService.loginUser(request.getUsername(), request.getPassword());

        if (!isValidUser) {
            return ResponseEntity.status(401).body("{\"status\": \"error\", \"message\": \"Invalid credentials\"}");
        }

        return ResponseEntity.ok("{\"status\": \"success\", \"message\": \"Login successful\"}");
    }
}
