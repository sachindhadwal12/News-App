package com.oshada.newsservice.service;

import com.oshada.newsservice.dto.NewsRequestDTO;
import com.oshada.newsservice.dto.NewsResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {

    @Value("${api.key}")
    private String apiKey;

    public NewsResponseDTO search(NewsRequestDTO newsRequestDTO) {
        RestTemplate restTemplate = new RestTemplate();
        newsRequestDTO.setApiKey(apiKey);
        String url = "https://newsapi.org/v2/everything?" + newsRequestDTO.toString();
        ResponseEntity<NewsResponseDTO> response = null;
        response = restTemplate.exchange(url, HttpMethod.GET, getEntity(), NewsResponseDTO.class);
        return response.getBody();
    }

    private HttpEntity getEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return new HttpEntity(headers);
    }

}
