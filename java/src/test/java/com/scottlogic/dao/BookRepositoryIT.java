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
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

/**
 * Created by bhoward on 01/12/2016.
 */

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookRepositoryIT {

    private Book testBook1;
    private Book testBook2;

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
    }

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private TestEntityManager entityManager;

    @After
    public void tearDown() {
        entityManager.clear();
    }

    @Test
    public void shouldGetById() {
        entityManager.persist(testBook1);

        final Optional<Book> result = bookRepository.findById(testBook1.getId());

        assertThat(result.get(), equalTo(testBook1));
    }

    @Test
    public void shouldGetByTitle() {
        entityManager.persist(testBook1);

        final Optional<Book> result = bookRepository.findByTitle(testBook1.getTitle());

        assertThat(result.get(), equalTo(testBook1));
    }

    @Test
    public void shouldGetAll() {
        entityManager.persist(testBook1);
        entityManager.persist(testBook2);

        final Iterable<Book> result = bookRepository.findAll();
        assertThat(result, Matchers.contains(testBook1, testBook2));
    }

    @Test
    public void shouldAddBook() {

        bookRepository.save(testBook1);

        final Book result = entityManager.find(Book.class, testBook1.getId());
        assertThat(result, equalTo(testBook1));

    }

    @Test
    public void shouldDeleteBook() {
        entityManager.persist(testBook1);
        entityManager.persist(testBook2);

        bookRepository.delete(testBook1.getId());

        final Book result1 = entityManager.find(Book.class, testBook1.getId());
        final Book result2 = entityManager.find(Book.class, testBook2.getId());
        assertThat(result1, equalTo(null));
        assertThat(result2, equalTo(testBook2));
    }

}
