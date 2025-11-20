package com.example.SpringbootExercises.exercises;

import org.springframework.web.bind.annotation.*;

@RestController
public class Exercise3Controller {

    // Add two numbers: /exercise3/add?a=5&b=10
    @GetMapping("/exercise3/add")
    public String add(@RequestParam int a, @RequestParam int b) {
        return "Addition Result: " + (a + b);
    }

    // Multiply two numbers: /exercise3/multiply?a=4&b=6
    @GetMapping("/exercise3/multiply")
    public String multiply(@RequestParam int a, @RequestParam int b) {
        return "Multiplication Result: " + (a * b);
    }

}
