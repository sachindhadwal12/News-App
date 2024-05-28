package com.oshada.wishlistservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "wish_list_item")
public class WishListItem {

    @Id
    private String articleId;

    private WishListItemSource source;

    private String author;

    private String title;

    private String description;

    private String url;

    private String urlToImage;

    private String publishedAt;

    private String content;

}
