package com.oshada.newsservice.config;

import java.util.Map;

public interface JWTTokenGenerator {

    Map<String, String> generateToken();
}
