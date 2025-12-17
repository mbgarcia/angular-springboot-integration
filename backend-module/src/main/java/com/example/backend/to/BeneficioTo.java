package com.example.backend.to;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Schema(description = "Objeto de apresentação da conta de benefício")
public class BeneficioTo {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(description = "Id da conta")
    private Long id;

    @NotNull
    @Schema(description = "Nome do cliente", example = "Maria de Nazaré")
    private String nome;

    @Schema(description = "Descrição para algum detalhe", example = "Conta de pessoa física")
    private String descricao;

    @Schema(description = "Saldo em conta")
    private BigDecimal valor;

    @Schema(description = "Se conta está ativa")
    private Boolean ativo;

    public BeneficioTo() {
    }

    public BeneficioTo(Long id, String nome, String descricao, BigDecimal valor, Boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
