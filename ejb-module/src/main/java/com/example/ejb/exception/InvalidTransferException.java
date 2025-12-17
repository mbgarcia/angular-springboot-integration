package com.example.ejb.exception;

public class InvalidTransferException extends Throwable {
    private String message;

    public InvalidTransferException(String message){
        super();

        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
