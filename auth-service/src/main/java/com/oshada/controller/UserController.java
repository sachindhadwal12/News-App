package com.oshada.controller;

import com.oshada.config.JWTTokenGenerator;
import com.oshada.domain.User;
import com.oshada.exception.UserAlreadyExistException;
import com.oshada.exception.UserNotFoundException;
import com.oshada.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController annotation is used to create Restful web services using Spring MVC
 */
@RestController
/**
 * RequestMapping annotation maps HTTP requests to handler methods
 */
@RequestMapping("/api/v1/auth")
public class UserController {

    private UserService userService;
    private JWTTokenGenerator jwtTokenGenerator;
    ResponseEntity<?> responseEntity;

    /**
     * To get the property values
     */
    @Value("${app.controller.exception.message1}")
    private String message1;

    @Value("${app.controller.exception.message2}")
    private String message2;

    @Value("${app.controller.exception.message3}")
    private String message3;


    /**
     * Autowiring should be implemented for the Service Layer and JWT Token Generator.
     * Please note that we should not create any object using the new keyword
     */

    @Autowired
    public UserController(UserService userService, JWTTokenGenerator jwtTokenGenerator) {
        this.userService = userService;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    /**
     * API Version: 1.0
     * Method to register a new user by reading the Serialized
     * User object from request body and save the user in database.
     * <p>
     * This handler method should return any one of the status messages basis on
     * different situations:
     * 1. 201(CREATED - In case of successful creation of the user
     * 2. 409(CONFLICT) - In case of duplicate id
     * <p>
     * This handler method should map to the URL "/api/v1/user" using HTTP POST
     * method".
     */
    @PostMapping("user")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            responseEntity = new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    /* API Version: 1.0
     * Method to authenticate a user by reading the Serialized user
     * object from request body containing the id and password. The id and password should be validated
     * before proceeding ahead with JWT token generation. The user credentials will be validated against the database entries.
     * The exception will be thrown if validation is not successful. If credentials are validated successfully, then JWT
     * token will be generated.
     * This handler method should map to the URL "/api/v1/login/user" using HTTP POST
     * method.
     */
    @PostMapping("login/user")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getPassword() == null) {
                throw new UserNotFoundException(message1);
            }
            User userDetails = userService.findByIdAndPassword(user.getEmail(), user.getPassword());
            if (userDetails == null) {
                throw new UserNotFoundException(message2);
            }
            if (!(user.getPassword().equals(userDetails.getPassword()))) {
                throw new UserNotFoundException(message3);
            }
            /*
             * Create ResponseEntity with token generated by calling generateToken method of JwtTokenGenerator
             */
            return ResponseEntity.ok(jwtTokenGenerator.generateToken(userDetails));
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
}
