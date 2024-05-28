package com.oshada.wishlistservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oshada.wishlistservice.config.JWTTokenGeneratorImpl;
import com.oshada.wishlistservice.controller.WishListController;
import com.oshada.wishlistservice.model.WishListItem;
import com.oshada.wishlistservice.model.WishListItemSource;
import com.oshada.wishlistservice.service.WishListService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
public class WishListControllerTest {

    private MockMvc mockMvc;

    // Mock WishListService layer
    @MockBean
    private WishListService wishListService;

    // Inject WishListService into WishListController
    @InjectMocks
    WishListController wishListController;

    private WishListItem wishListItem;

    @Autowired
    private JWTTokenGeneratorImpl jwtTokenGenerator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(wishListController).build();

        wishListItem = new WishListItem();
        wishListItem.setArticleId("1");

        WishListItemSource source = new WishListItemSource();
        source.setSourceId("sourceId");
        source.setName("Source Name");
        wishListItem.setSource(source);

        wishListItem.setAuthor("John Doe");
        wishListItem.setTitle("Sample Article Title");
        wishListItem.setDescription("Sample article description.");
        wishListItem.setUrl("https://example.com/article");
        wishListItem.setUrlToImage("https://example.com/article-image.jpg");
        wishListItem.setPublishedAt("2024-03-27T10:00:00Z");
        wishListItem.setContent("Sample article content.");

    }

    @AfterEach
    public void tearDown() {

    }

    /*
     * Test - POST mapping "/api/v1/news/search" to get result based on keywords, by mocking service class
     */
    @Test
    public void givenWishListItemToSaveThenShouldReturnSavedWishListItem() throws Exception {

        when(wishListService.saveWishListItem(any(WishListItem.class))).thenReturn(wishListItem);

        mockMvc.perform(post("/api/v1/wishlist/saveWishListItem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(wishListItem))
                        .header("Authorization", "Bearer " + jwtTokenGenerator.generateToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.articleId", is("1")))
                .andExpect(jsonPath("$.data.author", is("John Doe")))
                .andExpect(jsonPath("$.data.title", is("Sample Article Title")))
                .andExpect(jsonPath("$.data.description", is("Sample article description.")));

        verify(wishListService, times(1)).saveWishListItem(any(WishListItem.class));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}