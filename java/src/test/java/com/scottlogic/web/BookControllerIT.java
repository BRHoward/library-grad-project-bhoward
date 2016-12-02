package com.scottlogic.web;


import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import com.scottlogic.dao.BookRepository;
import com.scottlogic.domain.Book;
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
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BookRepository bookRepository;

    @After
    public void tearDown() {
        bookRepository.deleteAll();
    }

    @Test
    public void shouldGetBookFromId() {
        Book testBook1 = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );
        Book testBook2 = new Book(
                "Test Book 2",
                "Test Author 2",
                "Test Publish Date 2",
                "Test ISBN 2"
        );
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);

        final ResponseEntity<Book> result = restTemplate.getForEntity("/api/books/{id}", Book.class, testBook1.getId());

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), equalTo(testBook1));
    }

    @Test
    public void shouldGetAllBooks() {
        Book testBook1 = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );
        Book testBook2 = new Book(
                "Test Book 2",
                "Test Author 2",
                "Test Publish Date 2",
                "Test ISBN 2"
        );
        bookRepository.save(testBook1);
        bookRepository.save(testBook2);

        final ResponseEntity<Book[]> result = restTemplate.getForEntity("/api/books", Book[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), Matchers.arrayContaining(testBook1, testBook2));
    }

    @Test
    public void shouldAddBook() {
        Book testBook = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );

        final ResponseEntity<Void> response = restTemplate.postForEntity("/api/books", testBook, Void.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        final Optional<Book> repoBook = bookRepository.findByTitle("Test Book");
        assertThat(repoBook.get().getTitle(), equalTo(testBook.getTitle()));
        assertThat(repoBook.get().getAuthor(), equalTo(testBook.getAuthor()));
        assertThat(repoBook.get().getPublishDate(), equalTo(testBook.getPublishDate()));
        assertThat(repoBook.get().getIsbn(), equalTo(testBook.getIsbn()));
    }

    @Test
    public void shouldDeleteBook() {
        Book testBook = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );

        bookRepository.save(testBook);

        restTemplate.delete("/api/books/{id}", testBook.getId());

        final Optional<Book> repoBook = bookRepository.findByTitle("Test Book");
        assertThat(repoBook.isPresent(), equalTo(false));

    }

    @Test
    public void shouldUpdateBook() {
        Book oldBook = new Book(
                "Old Book",
                "Old Author",
                "Old Publish Date",
                "Old ISBN"
        );
        Book newBook = new Book(
                "New Book",
                "New Author",
                "New Publish Date",
                "New ISBN"
        );

        bookRepository.save(oldBook);

        restTemplate.put("/api/books/{id}", newBook, oldBook.getId());

        final Optional<Book> repoBook = bookRepository.findById(oldBook.getId());
        assertThat(repoBook.get().getTitle(), equalTo(newBook.getTitle()));
        assertThat(repoBook.get().getAuthor(), equalTo(newBook.getAuthor()));
        assertThat(repoBook.get().getPublishDate(), equalTo(newBook.getPublishDate()));
        assertThat(repoBook.get().getIsbn(), equalTo(newBook.getIsbn()));

    }

}
