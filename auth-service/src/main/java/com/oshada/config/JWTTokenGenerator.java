package com.oshada.config;

import java.util.Map;

import com.oshada.domain.User;

public interface JWTTokenGenerator {

    Map<String, String> generateToken(User user);
}
