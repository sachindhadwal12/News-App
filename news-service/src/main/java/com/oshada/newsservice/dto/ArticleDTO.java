package com.oshada.newsservice.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ArticleDTO {

    private String articleId = UUID.randomUUID().toString();;

    private SourceDTO source;

    private String author;

    private String title;

    private String description;

    private String url;

    private String urlToImage;

    private String publishedAt;

    private String content;

}
