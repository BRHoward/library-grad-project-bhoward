package com.scottlogic.web;


import com.scottlogic.dao.BookRepository;
import com.scottlogic.dao.ReservationRepository;
import com.scottlogic.domain.Book;
import com.scottlogic.domain.Reservation;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReservationControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private BookRepository bookRepository;

    private Book testBook1;
    private Book testBook2;
    private Reservation testReservation1;
    private Reservation testReservation2;

    @Before
    public void initialiseTestData() {
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
    }

    @After
    public void tearDown() {
        reservationRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void shouldGetReservationFromId() {
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);
        reservationRepository.save(testReservation1);
        reservationRepository.save(testReservation2);

        final ResponseEntity<Reservation> result = restTemplate.getForEntity("/api/reservations/{id}", Reservation.class, testReservation1.getId());

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), equalTo(testReservation1));
    }

    @Test
    public void shouldGetAllReservations() {
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);
        reservationRepository.save(testReservation1);
        reservationRepository.save(testReservation2);

        final ResponseEntity<Reservation[]> result = restTemplate.getForEntity("/api/reservations", Reservation[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), Matchers.arrayContaining(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        bookRepository.save(testBook1);
        final ResponseEntity<Void> response = restTemplate.postForEntity("/api/reservations", testReservation1, Void.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        final Reservation repoReservation = reservationRepository.findAll().iterator().next();

        assertThat(repoReservation.getStartDate().getTime(), equalTo(testReservation1.getStartDate().getTime()));
        assertThat(repoReservation.getEndDate().getTime(), equalTo(testReservation1.getEndDate().getTime()));
    }

    @Test
    public void shouldDeleteReservation() {
        bookRepository.save(testBook1);
        reservationRepository.save(testReservation1);

        restTemplate.delete("/api/reservations/{id}", testReservation1.getId());

        assertThat(reservationRepository.findByBook(testBook1).iterator().hasNext(), equalTo(false));
    }

    @Test
    public void shouldUpdateReservation() {
        bookRepository.save(testBook1);
        reservationRepository.save(testReservation1);

        restTemplate.put("/api/reservations/{id}", testReservation2, testReservation1.getId());

        final Optional<Reservation> repoReservation = reservationRepository.findById(testReservation1.getId());

        assertThat(repoReservation.get().getStartDate().getTime(), equalTo(testReservation2.getStartDate().getTime()));
        assertThat(repoReservation.get().getEndDate().getTime(), equalTo(testReservation2.getEndDate().getTime()));

    }
}
