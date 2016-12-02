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

    @Before
    public void setUp(){
        bookService = new BookServiceImpl(bookRepository);
    }

    @Test
    public void shouldGetBookById(){
        Book testBook = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );

        when(bookRepository.findById(0L)).thenReturn(Optional.of(testBook));

        final Optional<Book> result = bookService.getById(0L);

        assertThat(result.get(), equalTo(testBook));
    }

    @Test
    public void shouldGetAllBooks(){
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

        when(bookRepository.findAll()).thenReturn(Arrays.asList(testBook1, testBook2));

        final Iterable<Book> result = bookService.getAll();

        assertThat(result, Matchers.contains(testBook1, testBook2));
    }

    @Test
    public void shouldAddBook() {
        Book testBook1 = new Book(
                "Test Book",
                "Test Author",
                "Test Publish Date",
                "Test ISBN"
        );

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

        when(bookRepository.findById(0L)).thenReturn(Optional.of(oldBook));

        bookService.update(0L, newBook);

        assertThat(oldBook.getTitle(), equalTo(newBook.getTitle()));
        assertThat(oldBook.getAuthor(), equalTo(newBook.getAuthor()));
        assertThat(oldBook.getPublishDate(), equalTo(newBook.getPublishDate()));
        assertThat(oldBook.getIsbn(), equalTo(newBook.getIsbn()));
        verify(bookRepository).save(oldBook);
    }

    @Test (expected=EntityNotFoundException.class)
    public void shouldThrowExceptionIfUpdateBookNotFound() {
        Book newBook = new Book(
                "New Book",
                "New Author",
                "New Publish Date",
                "New ISBN"
        );

        when(bookRepository.findById(0L)).thenReturn(Optional.ofNullable(null));

        bookService.update(0L, newBook);
    }

}
