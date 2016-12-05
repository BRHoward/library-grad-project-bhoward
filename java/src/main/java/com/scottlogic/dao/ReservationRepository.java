package com.scottlogic.dao;

import com.scottlogic.domain.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
    Optional<Reservation> findById (final Long id);
    Iterable<Reservation> findByBookId (final Long bookId);
}
