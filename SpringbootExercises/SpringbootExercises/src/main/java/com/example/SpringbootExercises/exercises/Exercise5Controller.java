package com.example.SpringbootExercises.exercises;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class Exercise5Controller {

    // http://localhost:8080/exercise5/user
    @GetMapping("/exercise5/user")
    public Map<String, Object> getUser() {
        Map<String, Object> user = new HashMap<>();
        user.put("name", "Sundari");
        user.put("age", 21);
        user.put("city", "Rajahmundry");

        return user;
    }
}
