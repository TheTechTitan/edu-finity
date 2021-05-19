package com.titan.edufinity.authserver.repository;

import com.titan.edufinity.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUserName(String name);
}
