package com.BMS.ExceptionHandler;

import com.BMS.message.Message;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.message.Message;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {
    Message messageObject;
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> resourceNotFoundException(ResourceNotFoundException e){
        messageObject.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(messageObject);
    }@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        List<FieldError> list= e.getFieldErrors();
        Map<String,String> map=new HashMap<>();
        for(FieldError fe:list){
            map.put(fe.getField(),fe.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(map);
    }
}
