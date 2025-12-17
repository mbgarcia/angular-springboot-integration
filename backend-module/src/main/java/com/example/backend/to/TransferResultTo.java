package com.example.backend.to;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de retorno da transferência")
public class TransferResultTo {
    @Schema(description = "Status da transferência", example = "OK")
    private String status;

    @Schema(description = "Mensagem de retorno", example = "Transferencia realizada com sucesso")
    private String messagem;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessagem() {
        return messagem;
    }

    public void setMessagem(String messagem) {
        this.messagem = messagem;
    }
}
