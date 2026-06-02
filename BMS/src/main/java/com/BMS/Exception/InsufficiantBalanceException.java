package com.BMS.Exception;

public class InsufficiantBalanceException extends RuntimeException {
    public InsufficiantBalanceException(String message) {
        super(message);
    }
}
