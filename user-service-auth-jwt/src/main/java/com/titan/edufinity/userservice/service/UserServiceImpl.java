package com.titan.edufinity.userservice.service;

import com.titan.edufinity.model.user.User;
import com.titan.edufinity.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

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

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findByUserName(name);

        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username or password wrong"));

        /*UserDetails userDetails = (UserDetails) optionalUser.get();
        new AccountStatusUserDetailsChecker().check(userDetails);
        return userDetails;*/

        return new org.springframework.security.core.userdetails.User(optionalUser.get().getUserName(), optionalUser.get().getPassWord(), new ArrayList<>());
    }
}
