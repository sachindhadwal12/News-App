package com.oshada.newsservice.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SourceDTO {

    private String sourceId = UUID.randomUUID().toString();;

    private String id;

    private String name;

}
