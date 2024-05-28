package com.oshada.wishlistservice.repository;

import com.oshada.wishlistservice.model.WishListItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends MongoRepository<WishListItem, String> {
}
