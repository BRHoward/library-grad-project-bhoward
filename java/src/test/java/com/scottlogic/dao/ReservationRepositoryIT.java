package com.scottlogic.dao;


import com.scottlogic.domain.Book;
import com.scottlogic.domain.Reservation;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ReservationRepositoryIT {

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

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private TestEntityManager entityManager;

    @After
    public void tearDown() {entityManager.clear();}

    @Test
    public void shouldGetById() {
        entityManager.persist(testBook1);
        entityManager.persist(testReservation1);

        final Optional<Reservation> result = reservationRepository.findById(testReservation1.getId());

        assertThat(result.get(), equalTo(testReservation1));

    }

    @Test
    public void shouldGetByBook() {
        entityManager.persist(testBook1);
        entityManager.persist(testBook2);
        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        final Iterable<Reservation> result = reservationRepository.findByBook(testBook1);
        assertThat(result, Matchers.containsInAnyOrder(testReservation1));
    }

    @Test
    public void shouldGetAll() {
        entityManager.persist(testBook1);
        entityManager.persist(testBook2);
        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        final Iterable<Reservation> result = reservationRepository.findAll();
        assertThat(result, Matchers.contains(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        reservationRepository.save(testReservation1);

        final Reservation result = entityManager.find(Reservation.class, testReservation1.getId());
        assertThat(result, equalTo(testReservation1));
    }

    @Test
    public void shouldDeleteReservation() {
        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        reservationRepository.delete(testReservation1.getId());

        final Reservation result1 = entityManager.find(Reservation.class, testReservation1.getId());
        final Reservation result2 = entityManager.find(Reservation.class, testReservation2.getId());
        assertThat(result1, equalTo(null));
        assertThat(result2, equalTo(testReservation2));
    }

}
