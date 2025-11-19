package com.neurofleetx.controller;

import com.neurofleetx.entity.Ride;
import com.neurofleetx.entity.RideStatus;
import com.neurofleetx.repository.RideRepository;
import com.neurofleetx.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final RideRepository rideRepository;
    private final RideService rideService;

    @GetMapping("/rides")
    public ResponseEntity<List<Ride>> getAllRides() {
        return ResponseEntity.ok(rideRepository.findAll());
    }

    @PutMapping("/update-status/{rideId}/{status}")
    public ResponseEntity<String> updateRideStatus(
            @PathVariable Long rideId,
            @PathVariable String status
    ) {
        RideStatus st = RideStatus.valueOf(status.toUpperCase());
        rideService.updateRideStatus(rideId, st);

        return ResponseEntity.ok("Status updated by admin");
    }

    @DeleteMapping("/delete/{rideId}")
    public ResponseEntity<String> deleteRide(@PathVariable Long rideId) {
        rideRepository.deleteById(rideId);
        return ResponseEntity.ok("Ride deleted");
    }
}
