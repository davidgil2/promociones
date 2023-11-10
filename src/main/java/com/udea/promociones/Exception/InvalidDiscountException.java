package com.udea.promociones.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidDiscountException extends RuntimeException{
    public InvalidDiscountException(String message) {
        super(message);
    }
}
