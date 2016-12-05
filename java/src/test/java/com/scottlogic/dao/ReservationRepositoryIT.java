package com.scottlogic.dao;


import com.scottlogic.domain.Reservation;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ReservationRepositoryIT {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private TestEntityManager entityManager;

    @After
    public void tearDown() {entityManager.clear();}

    @Test
    public void shouldGetById() {
        Reservation testReservation = new Reservation(
                2L,
                new Date(),
                new Date()
        );

        entityManager.persist(testReservation);

        final Optional<Reservation> result = reservationRepository.findById(testReservation.getId());

        assertThat(result.get(), equalTo(testReservation));

    }

    @Test
    public void shouldGetByBookId() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(5000),
                new Date(6000)
        );
        Reservation testReservation2 = new Reservation(
                2L,
                new Date(7000),
                new Date(8000)
        );

        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        final Iterable<Reservation> result = reservationRepository.findByBookId(2L);
        assertThat(result, Matchers.contains(testReservation1, testReservation2));
    }

    @Test
    public void shouldGetAll() {
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

        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        final Iterable<Reservation> result = reservationRepository.findAll();
        assertThat(result, Matchers.contains(testReservation1, testReservation2));
    }

    @Test
    public void shouldAddReservation() {
        Reservation testReservation1 = new Reservation(
                2L,
                new Date(),
                new Date()
        );

        reservationRepository.save(testReservation1);

        final Reservation result = entityManager.find(Reservation.class, testReservation1.getId());
        assertThat(result, equalTo(testReservation1));
    }

    @Test
    public void shouldDeleteBook() {
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


        entityManager.persist(testReservation1);
        entityManager.persist(testReservation2);

        reservationRepository.delete(testReservation1.getId());

        final Reservation result1 = entityManager.find(Reservation.class, testReservation1.getId());
        final Reservation result2 = entityManager.find(Reservation.class, testReservation2.getId());
        assertThat(result1, equalTo(null));
        assertThat(result2, equalTo(testReservation2));
    }

}
