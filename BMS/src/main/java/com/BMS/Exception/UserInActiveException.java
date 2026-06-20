package com.BMS.Exception;

public class UserInActiveException extends RuntimeException {
    public UserInActiveException(String message) {
        super(message);
    }
}
