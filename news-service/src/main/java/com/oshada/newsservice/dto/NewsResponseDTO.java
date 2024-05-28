package com.oshada.newsservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class NewsResponseDTO {

    private String status;

    private Integer totalResults;

    private List<ArticleDTO> articles;

}
