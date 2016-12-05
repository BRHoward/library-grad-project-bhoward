package com.scottlogic.web;

import com.scottlogic.dao.ReservationRepository;
import com.scottlogic.domain.Reservation;
import com.scottlogic.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(final ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping(value = "api/reservations")
    @ResponseBody
    public Iterable<Reservation> getAllReservations() { return reservationService.getAll(); }

    @GetMapping(value = "/api/reservations/{id}")
    @ResponseBody
    public Reservation getReservation (@PathVariable("id") final Long id) {
        final Optional<Reservation> reservation = reservationService.getById(id);
        if (reservation.isPresent()) {
            return reservation.get();
        } else {
            throw new EntityNotFoundException("No reservation found with id" + id);
        }
    }

    @PostMapping(value="/api/reservations")
    public void addReservation(@RequestBody final Reservation reservation) {
        reservationService.add(reservation);
    }

    @DeleteMapping(value = "api/reservations/{id}")
    public void deleteReservation(@PathVariable("id") final Long id) {
        reservationService.delete(id);
    }

    @PutMapping(value = "api/reservations/{id}")
    public void updateReservations(@PathVariable("id") final Long id, @RequestBody final Reservation reservation) {
        reservationService.update(id, reservation);
    }

}
