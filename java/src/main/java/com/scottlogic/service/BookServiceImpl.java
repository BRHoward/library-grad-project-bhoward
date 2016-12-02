package com.scottlogic.service;

import com.scottlogic.dao.BookRepository;
import com.scottlogic.domain.Book;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;


/**
 * Created by bhoward on 01/12/2016.
 */

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(final BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Optional<Book> getById (final Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Iterable<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public void add(final Book book) {
        bookRepository.save(book);
    }

    @Override
    public void delete(final Long id) {
        bookRepository.delete(id);
    }

    @Override
    public void update(final Long id, final Book newBook) {
        Optional<Book> currentBook = bookRepository.findById(id);
        if(currentBook.isPresent()){
            Book oldBook = currentBook.get();
            oldBook.setTitle(newBook.getTitle());
            oldBook.setAuthor(newBook.getAuthor());
            oldBook.setPublishDate(newBook.getPublishDate());
            oldBook.setIsbn(newBook.getIsbn());
            bookRepository.save(oldBook);
        } else {
            throw new EntityNotFoundException("No book found with id " + id);
        }
    }

}
