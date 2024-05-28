package com.oshada.newsservice.controller;

import com.oshada.newsservice.dto.NewsRequestDTO;
import com.oshada.newsservice.exception.ResourceNotFoundException;
import com.oshada.newsservice.response.ResponseHandler;
import com.oshada.newsservice.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/news/")
public class NewsController {

    @Autowired
    NewsService newsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("news")
    public String getNews() {
        return "All News";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("search")
    public ResponseEntity<Object> search(@RequestBody NewsRequestDTO newsRequestDTO) {
        try {
            return ResponseHandler.generateResponse("Successfully retrieved data!!", HttpStatus.OK, newsService.search(newsRequestDTO));
        } catch (ResourceNotFoundException e) {
            return ResponseHandler.generateResponse("Not Found!", HttpStatus.NOT_FOUND, false);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Error occurred while retrieving data!", HttpStatus.INTERNAL_SERVER_ERROR, false);
        }
    }

}
