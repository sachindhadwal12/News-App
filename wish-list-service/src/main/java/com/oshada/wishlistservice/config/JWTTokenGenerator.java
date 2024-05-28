package com.oshada.wishlistservice.config;

import java.util.Map;

public interface JWTTokenGenerator {

    Map<String, String> generateToken();
}
