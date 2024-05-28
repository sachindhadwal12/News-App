package com.oshada.wishlistservice.config;

import com.oshada.wishlistservice.filter.JwtAdminFilter;
import com.oshada.wishlistservice.filter.JwtUserFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public FilterRegistrationBean jwtAdminFilter() {
        FilterRegistrationBean filter = new FilterRegistrationBean();
        filter.setFilter(new JwtAdminFilter(secret));
        filter.addUrlPatterns("/api/v1/admin/*");

        return filter;
    }

    @Bean
    public FilterRegistrationBean jwtUserFilter() {
        FilterRegistrationBean filter = new FilterRegistrationBean();
        filter.setFilter(new JwtUserFilter(secret));
        filter.addUrlPatterns("/api/v1/wishlist/*");

        return filter;
    }

}
