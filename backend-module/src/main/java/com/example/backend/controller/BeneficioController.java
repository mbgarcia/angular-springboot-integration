package com.example.backend.controller;

import com.example.backend.exception.BusinessException;
import com.example.backend.service.BeneficioService;
import com.example.backend.to.BeneficioTo;
import com.example.backend.to.TransferPayloadTo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/beneficios")
@Tag(name = "Beneficio", description = "Controlador de benefício")
public class BeneficioController {
    @Autowired
    BeneficioService service;

    @GetMapping("/")
    @Operation(summary = "Listar as contas de beneficios")
    public List<BeneficioTo> list() {
        return service.allBenefits();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta uma conta de benefício pelo id")
    public BeneficioTo findById(
            @Parameter(description = "Id da conta", example = "1")
            @PathVariable Long id) throws BusinessException {
        return service.findById(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria uma nova conta no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Operação realizada com sucesso",
                    content = @Content()),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public void create(@Valid @RequestBody BeneficioTo novo) {
        service.novaConta(novo);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Atualização de conta no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Operação realizada com sucesso",
                    content = @Content()),
            @ApiResponse(responseCode = "422", description = "Erro de negócio",
                    content = @Content(schema = @Schema(defaultValue = "{\"status\": \"422\", \"message\": \"Conta inválida\"}"))), // Empty content for 404
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public void update(@PathVariable Long id, @Valid @RequestBody BeneficioTo payload) throws BusinessException {
        service.update(id, payload);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Exclusão de conta no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Operação realizada com sucesso",
                    content = @Content()),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public void delete(@PathVariable Long id) throws BusinessException {
        service.delete(id);
    }

    @PostMapping("/transfer/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Transferência de saldo entre contas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transferência realizada com sucesso",
                    content = @Content()),
            @ApiResponse(responseCode = "422", description = "Erro de negócio",
                    content = @Content(schema = @Schema(defaultValue = "{\"status\": \"422\", \"message\": \"Valor a ser transferido é superior ao saldo\"}"))), // Empty content for 404
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public void transfer(
            @Valid @RequestBody TransferPayloadTo payload) throws BusinessException {
        service.transfer(payload);
    }
}
