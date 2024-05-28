package com.oshada.wishlistservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "wish_list_item_source")
public class WishListItemSource {

    private String sourceId;

    private String name;

}
