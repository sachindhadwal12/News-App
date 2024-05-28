package com.oshada.apigateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class DedupeResponseHeaderFilter extends AbstractGatewayFilterFactory<DedupeResponseHeaderFilter.Config> {

    public DedupeResponseHeaderFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> chain.filter(exchange).then(Mono.fromRunnable(() -> {
            Map<String, String> headersToRemove = new LinkedHashMap<>();
            exchange.getResponse().getHeaders().forEach((key, value) -> {
                if (value.size() > 1) {
                    headersToRemove.put(key, value.get(0));
                }
            });
            headersToRemove.forEach((key, value) -> exchange.getResponse().getHeaders().set(key, value));
        }));
    }

    public static class Config {
    }
}

