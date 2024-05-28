package com.oshada.service;

import com.oshada.domain.User;
import com.oshada.exception.UserAlreadyExistException;
import com.oshada.exception.UserNotFoundException;

public interface UserService {

    User saveUser(User user) throws UserAlreadyExistException;

    User findByIdAndPassword(String id, String password) throws UserNotFoundException;
}
