package com.scottlogic.service;


import com.scottlogic.dao.ReservationRepository;
import com.scottlogic.domain.Book;
import com.scottlogic.domain.Reservation;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ReservationServiceImplTest {

    @Mock
    private ReservationRepository reservationRepository;

    private ReservationService reservationService;

    @Before
    public void setUp() {
        reservationService = new ReservationServiceImpl(reservationRepository);
    }

    @Test
    public void shouldGetReservationById(){
        Reservation testReservation = new Reservation(
                2L,
                new Date(),
                new Date()
        );

        when(reservationRepository.findById(0L)).thenReturn(Optional.of(testReservation));

        final Optional<Reservation> result = reservationService.getById(0L);

        assertThat(result.get(), equalTo(testReservation));
    }

    @Test
    public void shouldGetAllReservations(){
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(),
                new Date()
        );
        Reservation testReservation2 = new Reservation(
                3L,
                new Date(),
                new Date()
        );

        when(reservationRepository.findAll()).thenReturn(Arrays.asList(testReservation1, testReservation2));

        final Iterable<Reservation> result = reservationService.getAll();

        assertThat(result, Matchers.contains(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        Reservation testReservation = new Reservation(
                2L,
                new Date(),
                new Date()
        );

        reservationService.add(testReservation);

        verify(reservationRepository).save(testReservation);
    }

    @Test (expected = IllegalArgumentException.class)
    public void shouldThrowExceptionIfBookAlreadyReserved() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );
        Reservation testReservation2 = new Reservation(
                2L,
                new Date(5500),
                new Date(6500)
        );
        when(reservationRepository.findAll()).thenReturn(Arrays.asList(testReservation1));

        reservationService.add(testReservation2);
    }

    @Test
    public void shouldDeleteReservation() {
        reservationService.delete(0L);

        verify(reservationRepository).delete(0L);
    }

    @Test
    public void shouldUpdateReservation() {
        Reservation oldReservation = new Reservation(
                0L,
                new Date(5000),
                new Date(5000)
        );

        Reservation newReservation = new Reservation(
                5L,
                new Date(7000),
                new Date(7000)
        );

        when(reservationRepository.findById(0L)).thenReturn(Optional.of(oldReservation));

        reservationService.update(0L, newReservation);

        assertThat(oldReservation.getBookId(), equalTo(newReservation.getBookId()));
        assertThat(oldReservation.getStartDate(), equalTo(newReservation.getStartDate()));
        assertThat(oldReservation.getEndDate(), equalTo(newReservation.getEndDate()));
        verify(reservationRepository).save(oldReservation);
    }

    @Test (expected = EntityNotFoundException.class)
    public void shouldThrowExceptionIfUpdateReservationNotFound() {
        Reservation newReservation = new Reservation(
                0L,
                new Date(),
                new Date()
        );
        when(reservationRepository.findById(0L)).thenReturn(Optional.ofNullable(null));

        reservationService.update(0L, newReservation);
    }

}
