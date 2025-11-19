package com.neurofleetx.scheduler;

import com.neurofleetx.entity.Ride;
import com.neurofleetx.entity.RideStatus;
import com.neurofleetx.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RideStatusScheduler {

    private final RideRepository rideRepository;

    @Scheduled(fixedRate = 60000) // every 1 minute
    public void updateRideStatuses() {
        LocalDateTime now = LocalDateTime.now();
        List<Ride> allRides = rideRepository.findAll();

        for (Ride ride : allRides) {
            if (ride.getStatus() == RideStatus.BOOKED &&
                    ride.getBookingTime().isBefore(now)) {

                ride.setStatus(RideStatus.IN_PROGRESS);
                rideRepository.save(ride);
            }

            if (ride.getStatus() == RideStatus.IN_PROGRESS &&
                    ride.getBookingTime().plusMinutes(30).isBefore(now)) {

                ride.setStatus(RideStatus.COMPLETED);
                rideRepository.save(ride);
            }
        }
    }
}
