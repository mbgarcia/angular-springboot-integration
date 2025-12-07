package com.example.ejb.exception;

public class InvalidTransferException extends Throwable {
    private String code;

    public InvalidTransferException(String code){
        super();

        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
