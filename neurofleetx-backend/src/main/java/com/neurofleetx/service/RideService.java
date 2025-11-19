package com.neurofleetx.service;

import com.neurofleetx.dto.BookRideRequest;
import com.neurofleetx.dto.RideDTO;
import com.neurofleetx.entity.Ride;
import com.neurofleetx.entity.RideStatus;
import com.neurofleetx.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;

    private RideDTO toDTO(Ride r) {
        return new RideDTO(
                r.getId(),
                r.getUserId(),
                r.getPickupLocation(),
                r.getDropLocation(),
                r.getVehicleType(),
                r.getStatus(),
                r.getBookingTime(),
                r.getCreatedAt()
        );
    }

    public RideDTO bookRide(BookRideRequest request) {

        Ride ride = new Ride();
        ride.setUserId(request.getUserId());
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropLocation(request.getDropLocation());
        ride.setVehicleType(request.getVehicleType());
        ride.setStatus(RideStatus.BOOKED);

        // FIX: directly parse the string (datetime-local format ISO-8601)
        LocalDateTime bookingTime;
        try {
            bookingTime = LocalDateTime.parse(request.getBookingTime());
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Must be ISO format (yyyy-MM-dd'T'HH:mm)");
        }

        if (bookingTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Booking time cannot be in the past");
        }

        ride.setBookingTime(bookingTime);
        ride.setCreatedAt(LocalDateTime.now());

        Ride saved = rideRepository.save(ride);
        return toDTO(saved);
    }

    public List<RideDTO> getUserRides(Long userId) {
        return rideRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public void updateRideStatus(Long rideId, RideStatus newStatus) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getStatus() != newStatus) {
            ride.setStatus(newStatus);
            rideRepository.save(ride);
        }
    }
}
