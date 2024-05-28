package com.oshada.newsservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oshada.newsservice.config.JWTTokenGeneratorImpl;
import com.oshada.newsservice.controller.NewsController;
import com.oshada.newsservice.dto.ArticleDTO;
import com.oshada.newsservice.dto.NewsRequestDTO;
import com.oshada.newsservice.dto.NewsResponseDTO;
import com.oshada.newsservice.dto.SourceDTO;
import com.oshada.newsservice.service.NewsService;
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
public class NewsControllerTest {

    private MockMvc mockMvc;

    // Mock NewsService layer
    @MockBean
    private NewsService newsService;

    // Inject NewsService into NewsController
    @InjectMocks
    NewsController newsController;

    private NewsRequestDTO newsRequestDTO;

    private NewsResponseDTO newsResponseDTO;

    @Autowired
    private JWTTokenGeneratorImpl jwtTokenGenerator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(newsController).build();

        newsRequestDTO = new NewsRequestDTO();
        newsRequestDTO.setApiKey("b84ddf477aaf48ec8a29433421b710c5");
        newsRequestDTO.setQ("apple");

        newsResponseDTO = new NewsResponseDTO();
        newsResponseDTO.setStatus("ok");
        newsResponseDTO.setTotalResults(2); // Sample total results count

        ArticleDTO article1 = getArticleDTO1();

        ArticleDTO article2 = getArticleDTO2();

        newsResponseDTO.setArticles(Arrays.asList(article1, article2));

    }

    private static ArticleDTO getArticleDTO2() {
        ArticleDTO article2 = new ArticleDTO();
        article2.setArticleId("2");
        article2.setSource(getSourceDTO());
        article2.setAuthor("Jane Doe");
        article2.setTitle("Sample Article Title 2");
        article2.setDescription("Sample article description 2.");
        article2.setUrl("https://example.com/article2");
        article2.setUrlToImage("https://example.com/article2-image.jpg");
        article2.setPublishedAt("2024-03-28T10:00:00Z");
        article2.setContent("Sample article content 2.");
        return article2;
    }

    private static ArticleDTO getArticleDTO1() {
        ArticleDTO article1 = new ArticleDTO();
        article1.setArticleId("1");
        article1.setSource(getSourceDTO());
        article1.setAuthor("John Doe");
        article1.setTitle("Sample Article Title 1");
        article1.setDescription("Sample article description 1.");
        article1.setUrl("https://example.com/article1");
        article1.setUrlToImage("https://example.com/article1-image.jpg");
        article1.setPublishedAt("2024-03-27T10:00:00Z");
        article1.setContent("Sample article content 1.");
        return article1;
    }

    private static SourceDTO getSourceDTO() {
        SourceDTO sourceDTO = new SourceDTO();
        sourceDTO.setId("sourceId");
        sourceDTO.setName("Source Name");
        return sourceDTO;
    }

    @AfterEach
    public void tearDown() {

    }

    /*
     * Test - POST mapping "/api/v1/news/search" to get result based on keywords, by mocking service class
     */
    @Test
    public void givenSearchNewsBasesOnKeyWordsThenShouldReturnListOfAllNews() throws Exception {
//        Mocking the news service to return some data
        when(newsService.search(any())).thenReturn(newsResponseDTO);

//        Invoking the search method
        mockMvc.perform(post("/api/v1/news/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(newsRequestDTO))
                .header("Authorization", "Bearer " + jwtTokenGenerator.generateToken()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                assertions for response JSON content
                .andExpect(jsonPath("$.data.status", is("ok")))
                .andExpect(jsonPath("$.data.totalResults", is(2)));

//        Verify that the search method of newsService was called once
        verify(newsService, times(1)).search(any());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}