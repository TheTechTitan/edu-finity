package com.titan.edufinity.userservice.controller;

import com.titan.edufinity.model.user.User;
import com.titan.edufinity.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/services/users")
public class UserServiceController {

    @Autowired
    UserService userService;

    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping(value = "/{id}")
    public User getUser(@PathVariable int id) {

        System.out.println("request came on "+ LocalDateTime.now() + " +++++++++");
        return userService.findById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
