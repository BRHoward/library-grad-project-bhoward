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

    private Book testBook1;
    private Book testBook2;
    private Reservation testReservation1;
    private Reservation testReservation2;
    private Reservation testReservation3;

    @Before
    public void setUp() {
        reservationService = new ReservationServiceImpl(reservationRepository);
        testBook1 = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );
        testBook2 = new Book(
                "Test Book 2",
                "Test Author 2",
                "Test Publish Date 2",
                "Test ISBN 2"
        );
        testReservation1 = new Reservation(
                testBook1,
                new Date(5000),
                new Date(6000)
        );
        testReservation2 = new Reservation(
                testBook2,
                new Date(5000),
                new Date(6000)
        );
        testReservation3 = new Reservation(
                testBook2,
                new Date(5500),
                new Date(6500)
        );
    }

    @Test
    public void shouldGetReservationById(){
        when(reservationRepository.findById(0L)).thenReturn(Optional.of(testReservation1));

        final Optional<Reservation> result = reservationService.getById(0L);

        assertThat(result.get(), equalTo(testReservation1));
    }

    @Test
    public void shouldGetAllReservations(){
        when(reservationRepository.findAll()).thenReturn(Arrays.asList(testReservation1, testReservation2));

        final Iterable<Reservation> result = reservationService.getAll();

        assertThat(result, Matchers.contains(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        reservationService.add(testReservation1);

        verify(reservationRepository).save(testReservation1);
    }

    @Test (expected = IllegalArgumentException.class)
    public void shouldThrowExceptionIfBookAlreadyReserved() {
        when(reservationRepository.findAll()).thenReturn(Arrays.asList(testReservation2));

        reservationService.add(testReservation3);
    }

    @Test
    public void shouldDeleteReservation() {
        reservationService.delete(0L);

        verify(reservationRepository).delete(0L);
    }

    @Test
    public void shouldUpdateReservation() {
        when(reservationRepository.findById(0L)).thenReturn(Optional.of(testReservation1));

        reservationService.update(0L, testReservation2);

        assertThat(testReservation1.getBook(), equalTo(testReservation2.getBook()));
        assertThat(testReservation1.getStartDate(), equalTo(testReservation2.getStartDate()));
        assertThat(testReservation1.getEndDate(), equalTo(testReservation2.getEndDate()));
        verify(reservationRepository).save(testReservation1);
    }

    @Test (expected = EntityNotFoundException.class)
    public void shouldThrowExceptionIfUpdateReservationNotFound() {
        when(reservationRepository.findById(0L)).thenReturn(Optional.ofNullable(null));

        reservationService.update(0L, testReservation1);
    }

}
