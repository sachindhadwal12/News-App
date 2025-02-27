package com.oshada.service;

import com.oshada.domain.User;
import com.oshada.exception.UserAlreadyExistException;
import com.oshada.exception.UserNotFoundException;
import com.oshada.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
 * This class is implementing the UserService interface. This class has to be annotated with
 * @Service annotation.
 * @Service indicates annotated class is a service
 * which hold business logic in the Service layer
 *
 * */

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    /**
     * To get the property values
     */
    @Value("${app.service.message1}")
    private String message1;

    @Value("${app.service.message2}")
    private String message2;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistException {

        Optional<User> userResult = userRepository.findById(user.getEmail());

        if (userResult.isPresent()) {
            throw new UserAlreadyExistException(message1);
        }else if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new UserAlreadyExistException("User Id cannot be empty");
        } else if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new UserAlreadyExistException("Password cannot be empty");
        } else if (user.getRole() == null) {
            throw new UserAlreadyExistException("Role cannot be empty");
        }

        return userRepository.save(user);
    }

    @Override
    public User findByIdAndPassword(String id, String password) throws UserNotFoundException {
        User authUser = userRepository.findByEmailAndPassword(id, password);
        if (authUser == null) {
            throw new UserNotFoundException(message2);
        }
        return authUser;
    }

}
