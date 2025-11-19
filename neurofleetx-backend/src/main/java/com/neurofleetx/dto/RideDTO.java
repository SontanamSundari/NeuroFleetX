package com.neurofleetx.dto;

import com.neurofleetx.entity.RideStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record RideDTO(
        Long id,
        Long userId,
        String pickupLocation,
        String dropLocation,
        String vehicleType,
        RideStatus status,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime bookingTime,
        LocalDateTime createdAt
) {}
