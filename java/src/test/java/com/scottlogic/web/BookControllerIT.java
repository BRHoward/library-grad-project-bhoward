package com.scottlogic.web;


import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import com.scottlogic.dao.BookRepository;
import com.scottlogic.domain.Book;
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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BookRepository bookRepository;

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

    @After
    public void tearDown() {
        bookRepository.deleteAll();
    }

    @Test
    public void shouldGetBookFromId() {
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);

        final ResponseEntity<Book> result = restTemplate.getForEntity("/api/books/{id}", Book.class, testBook1.getId());

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), equalTo(testBook1));
    }

    @Test
    public void shouldGetAllBooks() {
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);

        final ResponseEntity<Book[]> result = restTemplate.getForEntity("/api/books", Book[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), Matchers.arrayContaining(testBook1, testBook2));
    }

    @Test
    public void shouldAddBook() {
        final ResponseEntity<Void> response = restTemplate.postForEntity("/api/books", testBook1, Void.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        final Optional<Book> repoBook = bookRepository.findByTitle("Test Book");
        assertThat(repoBook.get().getTitle(), equalTo(testBook1.getTitle()));
        assertThat(repoBook.get().getAuthor(), equalTo(testBook1.getAuthor()));
        assertThat(repoBook.get().getPublishDate(), equalTo(testBook1.getPublishDate()));
        assertThat(repoBook.get().getIsbn(), equalTo(testBook1.getIsbn()));
    }

    @Test
    public void shouldDeleteBook() {
        bookRepository.save(testBook1);

        restTemplate.delete("/api/books/{id}", testBook1.getId());

        final Optional<Book> repoBook = bookRepository.findByTitle("Test Book");
        assertThat(repoBook.isPresent(), equalTo(false));

    }

    @Test
    public void shouldUpdateBook() {
        bookRepository.save(testBook1);

        restTemplate.put("/api/books/{id}", testBook2, testBook1.getId());

        final Optional<Book> repoBook = bookRepository.findById(testBook1.getId());
        assertThat(repoBook.get().getTitle(), equalTo(testBook2.getTitle()));
        assertThat(repoBook.get().getAuthor(), equalTo(testBook2.getAuthor()));
        assertThat(repoBook.get().getPublishDate(), equalTo(testBook2.getPublishDate()));
        assertThat(repoBook.get().getIsbn(), equalTo(testBook2.getIsbn()));

    }

}
