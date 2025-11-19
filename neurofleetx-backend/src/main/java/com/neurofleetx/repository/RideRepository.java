package com.neurofleetx.repository;

import com.neurofleetx.entity.Ride;
import com.neurofleetx.entity.RideStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByUserId(Long userId);
    List<Ride> findByStatus(RideStatus status);
}
