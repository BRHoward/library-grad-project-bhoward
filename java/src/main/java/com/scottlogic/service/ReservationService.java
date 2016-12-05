package com.scottlogic.service;

import com.scottlogic.domain.Reservation;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface ReservationService {
    Optional<Reservation> getById (final Long id);

    Iterable<Reservation> getAll();

    void add (final Reservation reservation);

    void delete (final Long id);

    void update (final Long id, final Reservation reservation);

}
