package com.example.backend.to;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Schema(description = "Objeto de entrada para a operação de transferência")
public class TransferPayloadTo {
    @NotNull
    @Schema(description = "Id da conta de origem", example = "1")
    private Long fromId;

    @NotNull
    @Schema(description = "Id da conta de destino", example = "2")
    private Long toId;

    @NotNull
    @DecimalMin(value = "0.01", inclusive = true)
    @Schema(description = "Valor da tarnsação", example = "2")
    private BigDecimal valor;

    public Long getFromId() {
        return fromId;
    }

    public void setFromId(Long fromId) {
        this.fromId = fromId;
    }

    public Long getToId() {
        return toId;
    }

    public void setToId(Long toId) {
        this.toId = toId;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}
