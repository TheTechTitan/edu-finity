package com.titan.edufinity.authserver.service;



import com.titan.edufinity.authserver.repository.AuthRepository;
import com.titan.edufinity.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {

        Optional<User> optionalUser = authRepository.findByUserName(name);

        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username or password wrong"));

        /*UserDetails userDetails = (UserDetails) optionalUser.get();
        new AccountStatusUserDetailsChecker().check(userDetails);
        return userDetails;*/

        return new org.springframework.security.core.userdetails.User(optionalUser.get().getUserName(), optionalUser.get().getPassWord(), new ArrayList<>());

        //return new User("foi", "foi", new ArrayList<>());
    }
}
