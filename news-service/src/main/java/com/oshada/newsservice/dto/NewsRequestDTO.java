package com.oshada.newsservice.dto;

import lombok.Data;

@Data
public class NewsRequestDTO {

    private String q;

    private String searchIn;

    private String sources;

    private String domains;

    private String excludeDomains;

    private String from;

    private String to;

    private String language;

    private String sortBy;

    private String pageSize;

    private String page;

    private String apiKey;

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        appendParameter(stringBuilder, "q", q);
        appendParameter(stringBuilder, "searchIn", searchIn);
        appendParameter(stringBuilder, "sources", sources);
        appendParameter(stringBuilder, "domains", domains);
        appendParameter(stringBuilder, "excludeDomains", excludeDomains);
        appendParameter(stringBuilder, "from", from);
        appendParameter(stringBuilder, "to", to);
        appendParameter(stringBuilder, "language", language);
        appendParameter(stringBuilder, "sortBy", sortBy);
        appendParameter(stringBuilder, "pageSize", pageSize);
        appendParameter(stringBuilder, "page", page);
        appendParameter(stringBuilder, "apiKey", apiKey);
        return stringBuilder.toString();
    }

    private void appendParameter(StringBuilder stringBuilder, String paramName, String paramValue) {
        if (paramValue != null && !paramValue.isEmpty()) {
            if (stringBuilder.length() > 0) {
                stringBuilder.append("&");
            }
            stringBuilder.append(paramName).append("=").append(paramValue);
        }
    }

}
