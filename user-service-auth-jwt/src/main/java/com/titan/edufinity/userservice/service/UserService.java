package com.titan.edufinity.userservice.service;

import com.titan.edufinity.model.user.User;

import java.util.List;

public interface UserService {

    User save(User user);
    User findById(int id);
    List<User> findAll();
}
