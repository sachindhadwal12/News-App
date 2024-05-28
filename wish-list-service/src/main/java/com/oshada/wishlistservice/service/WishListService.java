package com.oshada.wishlistservice.service;

import com.oshada.wishlistservice.exception.ArticleIdDoesNotFoundException;
import com.oshada.wishlistservice.model.WishListItem;
import com.oshada.wishlistservice.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishListService {

    @Autowired
    WishListRepository wishListRepository;

    public WishListItem saveWishListItem(WishListItem wishListItem) {
        return wishListRepository.save(wishListItem);
    }

    public List<WishListItem> getWishListItems() {
        return wishListRepository.findAll();
    }

    public boolean deleteWishListItem(String articleId) throws ArticleIdDoesNotFoundException {
        Optional<WishListItem> wishListItemOptional = wishListRepository.findById(articleId);
        if(wishListItemOptional.isEmpty()) {
            throw new ArticleIdDoesNotFoundException("Article id not found in DB");
        }
        else {
            WishListItem wishListItem = wishListItemOptional.get();
            wishListRepository.delete(wishListItem);
            return true;
        }
    }

}
