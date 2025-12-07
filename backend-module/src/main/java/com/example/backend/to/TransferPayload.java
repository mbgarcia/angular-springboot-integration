package com.example.backend.to;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class TransferPayload {
    @NotNull
    private Long from;

    @NotNull
    private Long to;

    @NotNull
    private BigDecimal value;

    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
