package com.scottlogic.service;

import com.scottlogic.dao.BookRepository;
import com.scottlogic.domain.Book;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by bhoward on 01/12/2016.
 */

@RunWith(MockitoJUnitRunner.class)
public class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    private BookService bookService;

    private Book testBook1;
    private Book testBook2;

    @Before
    public void setUp(){
        bookService = new BookServiceImpl(bookRepository);
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

    @Test
    public void shouldGetBookById(){
        when(bookRepository.findById(0L)).thenReturn(Optional.of(testBook1));

        final Optional<Book> result = bookService.getById(0L);

        assertThat(result.get(), equalTo(testBook1));
    }

    @Test
    public void shouldGetAllBooks(){
        when(bookRepository.findAll()).thenReturn(Arrays.asList(testBook1, testBook2));

        final Iterable<Book> result = bookService.getAll();

        assertThat(result, Matchers.contains(testBook1, testBook2));
    }

    @Test
    public void shouldAddBook() {
        bookService.add(testBook1);

        verify(bookRepository).save(testBook1);
    }

    @Test
    public void shouldDeleteBook() {
        bookService.delete(0L);

        verify(bookRepository).delete(0L);
    }

    @Test
    public void shouldUpdateBook() {

        when(bookRepository.findById(0L)).thenReturn(Optional.of(testBook1));

        bookService.update(0L, testBook2);

        assertThat(testBook1.getTitle(), equalTo(testBook2.getTitle()));
        assertThat(testBook1.getAuthor(), equalTo(testBook2.getAuthor()));
        assertThat(testBook1.getPublishDate(), equalTo(testBook2.getPublishDate()));
        assertThat(testBook1.getIsbn(), equalTo(testBook2.getIsbn()));
        verify(bookRepository).save(testBook1);
    }

    @Test (expected=EntityNotFoundException.class)
    public void shouldThrowExceptionIfUpdateBookNotFound() {
        when(bookRepository.findById(0L)).thenReturn(Optional.ofNullable(null));

        bookService.update(0L, testBook1);
    }

}
