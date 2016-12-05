package com.scottlogic.web;


import com.scottlogic.dao.ReservationRepository;
import com.scottlogic.domain.Reservation;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReservationControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ReservationRepository reservationRepository;

    @After
    public void tearDown() {
        reservationRepository.deleteAll();
    }

    @Test
    public void shouldGetBookFromId() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );
        Reservation testReservation2 = new Reservation(
                4L,
                new Date(5500),
                new Date(6500)
        );
        reservationRepository.save(testReservation1);
        reservationRepository.save(testReservation2);

        final ResponseEntity<Reservation> result = restTemplate.getForEntity("/api/reservations/{id}", Reservation.class, testReservation1.getId());

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), equalTo(testReservation1));
    }

    @Test
    public void shouldGetAllBooks() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );
        Reservation testReservation2 = new Reservation(
                4L,
                new Date(5500),
                new Date(6500)
        );
        reservationRepository.save(testReservation1);
        reservationRepository.save(testReservation2);

        final ResponseEntity<Reservation[]> result = restTemplate.getForEntity("/api/reservations", Reservation[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), Matchers.arrayContaining(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );

        final ResponseEntity<Void> response = restTemplate.postForEntity("/api/reservations", testReservation1, Void.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        final Iterable<Reservation> repoBooksWithId = reservationRepository.findByBookId(2L);
        final Reservation repoBook = repoBooksWithId.iterator().next();

        assertThat(repoBook.getBookId(), equalTo(testReservation1.getBookId()));
        assertThat(repoBook.getStartDate().getTime(), equalTo(testReservation1.getStartDate().getTime()));
        assertThat(repoBook.getEndDate().getTime(), equalTo(testReservation1.getEndDate().getTime()));
    }

    @Test
    public void shouldDeleteReservation() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );

        reservationRepository.save(testReservation1);

        restTemplate.delete("/api/reservations/{id}", testReservation1.getId());

        assertThat(reservationRepository.findByBookId(2L).iterator().hasNext(), equalTo(false));
    }

    @Test
    public void shouldUpdateBook() {
        Reservation oldReservation = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );
        Reservation newReservation = new Reservation(
                4L,
                new Date(7000),
                new Date(8000)
        );

        reservationRepository.save(oldReservation);

        restTemplate.put("/api/reservations/{id}", newReservation, oldReservation.getId());

        final Optional<Reservation> repoBook = reservationRepository.findById(oldReservation.getId());
        assertThat(repoBook.get().getBookId(), equalTo(newReservation.getBookId()));
        assertThat(repoBook.get().getStartDate().getTime(), equalTo(newReservation.getStartDate().getTime()));
        assertThat(repoBook.get().getEndDate().getTime(), equalTo(newReservation.getEndDate().getTime()));

    }

}
