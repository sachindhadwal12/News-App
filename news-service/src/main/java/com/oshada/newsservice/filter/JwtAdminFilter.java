package com.oshada.newsservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.security.Key;
import java.util.Objects;

/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */
public class JwtAdminFilter extends GenericFilterBean {

    private String secret;

    public JwtAdminFilter(String secret) {
        this.secret = secret;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Credentails","true");
        response.setHeader("Access-Control-Allow-Headers","*");
        final String authHeader = request.getHeader("authorization");

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {
            if(authHeader== null||(! authHeader.startsWith("Bearer "))){
                throw new ServletException("Missing or invalid Authorization header");
            }
            String myToken = authHeader.substring(7);

            Claims claims = extractAllClaims(myToken);
            String role = (String) claims.get("role");

            if(Objects.nonNull(role) && "Admin".equalsIgnoreCase(role)) {
                request.setAttribute("claims", claims);
                request.setAttribute("user", request.getParameter("user"));
                filterChain.doFilter(request, response);
            } else {
                throw new ServletException("Admin Role Only");
            }
        }
    }

    public Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}

