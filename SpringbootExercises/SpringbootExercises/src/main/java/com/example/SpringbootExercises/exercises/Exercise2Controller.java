package com.example.SpringbootExercises.exercises;

import org.springframework.web.bind.annotation.*;

@RestController
public class Exercise2Controller {

    @GetMapping("/exercise2")
    public String getStudent() {
        String name = "Sundari";
        int marks = 95;

        return "Student Name: " + name + ", Marks: " + marks;
    }

    @PostMapping("/exercise2/message")
    public String postMessage(@RequestBody String message) {
        return "You sent: " + message;
    }
}
