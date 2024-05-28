package com.oshada.test.config;

import com.oshada.config.JWTTokenGeneratorImpl;
import com.oshada.domain.Role;
import com.oshada.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.HashMap;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JWTTokenGeneratorImplTest {

    private User user;

    @Autowired
    private JWTTokenGeneratorImpl jwtTokenGenerator;
    private Map<String, String> tokenMap;

    @BeforeEach
    public void setup() {
        user = new User("andy@email.com", "jnvGV7t73yr7y", Role.ADMIN, "Andy");
        tokenMap = new HashMap<>();
    }

    @Test
    void givenAUserThenCallToGenerateTokenShouldReturnNotNull() {
        /*Act*/
        tokenMap = jwtTokenGenerator.generateToken(user);
        /*Assert*/
        assertNotNull(tokenMap);
    }

    @Test
    void givenAUserThenShouldReturnExpectedKeysInMap() {
        /*ACt*/
        tokenMap = jwtTokenGenerator.generateToken(user);
        /*Assert*/
        assertNotNull(tokenMap.containsKey("token"));
        assertNotNull(tokenMap.containsKey("message"));
    }

    @Test
    void givenAUserThenShouldReturnExpectedTokenInMap() {
        /*ACt*/
        tokenMap = jwtTokenGenerator.generateToken(user);
        /*Assert*/
        assertThat(tokenMap.get("token").length()).isGreaterThan(20);
    }

    @Test
    void givenAUserThenShouldReturnExpectedClaimInMap() {
        /*ACt*/
        tokenMap = jwtTokenGenerator.generateToken(user);
        /*Assert*/
        assertThat(tokenMap.get("message")).isEqualTo("Login Successful");
    }

}