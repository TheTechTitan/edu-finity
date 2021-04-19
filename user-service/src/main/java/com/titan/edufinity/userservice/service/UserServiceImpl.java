package com.titan.edufinity.userservice.service;

import com.titan.edufinity.model.user.User;
import com.titan.edufinity.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(int id) {

        Optional<User> user = userRepository.findById(id);

        if(user.isPresent())
            return user.get();
        else
            return new User();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
