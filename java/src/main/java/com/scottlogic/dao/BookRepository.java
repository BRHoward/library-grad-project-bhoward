package com.scottlogic.dao;

import com.scottlogic.domain.Book;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

/**
 * Created by bhoward on 30/11/2016.
 */
public interface BookRepository  extends CrudRepository<Book, Long> {
    Optional<Book> findById(final Long id);
    Optional<Book> findByTitle(final String title);
}
