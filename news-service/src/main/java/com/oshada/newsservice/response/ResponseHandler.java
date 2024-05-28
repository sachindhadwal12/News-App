package com.oshada.newsservice.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {

//    return response entity with a hashmap containing message, status value and responseObject
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> reponseMap = new HashMap<>();
        reponseMap.put("message", message);
        reponseMap.put("status", status.value());
        reponseMap.put("data", responseObj);

        return new ResponseEntity<>(reponseMap, status);
    }

}
