package com.scottlogic.service;

import com.scottlogic.dao.ReservationRepository;
import com.scottlogic.domain.Reservation;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl  implements ReservationService{

    private final ReservationRepository reservationRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Override
    public Optional<Reservation> getById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public Iterable<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @Override
    public void add(Reservation reservation) {
    if(reservationValid(reservation)) {
        reservationRepository.save(reservation);
    } else {
        throw new IllegalArgumentException("The book is already reserved at this time");
    }
    }

    @Override
    public void delete(Long id) {
        reservationRepository.delete(id);
    }

    @Override
    public void update(Long id, Reservation newReservation) {
        Optional<Reservation> currentReservation = reservationRepository.findById(id);
        if(currentReservation.isPresent()){
            Reservation oldReservation = currentReservation.get();
            oldReservation.setBookId(newReservation.getBookId());
            oldReservation.setStartDate(newReservation.getStartDate());
            oldReservation.setEndDate(newReservation.getEndDate());
            reservationRepository.save(oldReservation);
        } else {
            throw new EntityNotFoundException("No book found with id " + id);
        }
    }

    private boolean reservationValid(Reservation newReservation) {
        boolean valid = true;

        Iterable<Reservation> currentReservations = reservationRepository.findAll();

        for (Reservation res : currentReservations) {
            if (res.getBookId() == newReservation.getBookId() &&
                    res.getStartDate().before(newReservation.getEndDate()) &&
                    newReservation.getStartDate().before(res.getEndDate()))
            {
                valid = false;
                break;
            }
        }

        return valid;
    }
}
