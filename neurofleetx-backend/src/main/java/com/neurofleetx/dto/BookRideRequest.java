package com.neurofleetx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRideRequest {
    private Long userId;
    private String pickupLocation;
    private String dropLocation;
    private String vehicleType;
    private String bookingTime; // format: yyyy-MM-dd HH:mm
}
