package com.neurofleetx.controller;

import com.neurofleetx.dto.BookRideRequest;
import com.neurofleetx.dto.RideDTO;
import com.neurofleetx.entity.RideStatus;
import com.neurofleetx.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RideController {

    private final RideService rideService;

    @PostMapping("/book")
    public ResponseEntity<RideDTO> bookRide(@RequestBody BookRideRequest request) {
        return ResponseEntity.ok(rideService.bookRide(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<RideDTO>> getUserRides(@PathVariable Long userId) {
        return ResponseEntity.ok(rideService.getUserRides(userId));
    }

    @PutMapping("/{rideId}/status/{status}")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long rideId,
            @PathVariable String status
    ) {
        RideStatus newStatus = RideStatus.valueOf(status.toUpperCase());
        rideService.updateRideStatus(rideId, newStatus);

        return ResponseEntity.ok("Ride status updated");
    }
}
