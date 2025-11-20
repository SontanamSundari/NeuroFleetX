package com.example.SpringbootExercises.exercises;

import org.springframework.web.bind.annotation.*;

@RestController
public class Exercise1Controller {

    @GetMapping("/exercise1")
    public String sayHello() {
        return "Welcome to Spring Boot!";
    }
}
