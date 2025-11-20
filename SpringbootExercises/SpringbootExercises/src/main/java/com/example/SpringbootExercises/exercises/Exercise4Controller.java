package com.example.SpringbootExercises.exercises;

import org.springframework.web.bind.annotation.*;

@RestController
public class Exercise4Controller {

    // Example: http://localhost:8080/exercise4/John
    @GetMapping("/exercise4/{name}")
    public String greet(@PathVariable String name) {
        return "Hello, " + name + "! Welcome to Exercise 4.";
    }
}
