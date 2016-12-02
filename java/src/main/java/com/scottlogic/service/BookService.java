package com.scottlogic.service;

import com.scottlogic.domain.Book;

import java.util.List;
import java.util.Optional;

/**
 * Created by bhoward on 01/12/2016.
 */
public interface BookService {
    Optional<Book> getById (final Long Id);

    Iterable<Book> getAll();

    void add(final Book book);

    void delete (final Long id);

    void update(final Long id, final Book book);
}
