package com.oshada.wishlistservice.controller;

import com.oshada.wishlistservice.exception.ArticleIdDoesNotFoundException;
import com.oshada.wishlistservice.model.WishListItem;
import com.oshada.wishlistservice.response.ResponseHandler;
import com.oshada.wishlistservice.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wishlist/")
public class WishListController {

    @Autowired
    WishListService wishListService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("saveWishListItem")
    public ResponseEntity<?> saveWishListItem(@RequestBody WishListItem wishListItem){
        try {
            return ResponseHandler.generateResponse("Successfully saved data!!", HttpStatus.OK, wishListService.saveWishListItem(wishListItem));
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Error occurred while saving data!", HttpStatus.INTERNAL_SERVER_ERROR, false);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("getWishListItems")
    public ResponseEntity<?> getWishListItems(){
        try {
            return ResponseHandler.generateResponse("Successfully retrieved data!!", HttpStatus.OK, wishListService.getWishListItems());
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Error occurred while retrieving data!", HttpStatus.INTERNAL_SERVER_ERROR, false);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("deleteWishListItem/{articleId}")
    public ResponseEntity<?> deleteWishListItem(@PathVariable String articleId){
        try {
            return ResponseHandler.generateResponse("Successfully removed from wish list!!", HttpStatus.OK, wishListService.deleteWishListItem(articleId));
        } catch (ArticleIdDoesNotFoundException e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, false);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Error occurred while deleting data!", HttpStatus.INTERNAL_SERVER_ERROR, false);
        }
    }

}
