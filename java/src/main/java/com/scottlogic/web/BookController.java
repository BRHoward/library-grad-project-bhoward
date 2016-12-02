package com.scottlogic.web;

import com.scottlogic.domain.Book;
import com.scottlogic.service.BookService;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

/**
 * Created by bhoward on 30/11/2016.
 */

@RestController
public class BookController {

    private final BookService bookService;

    public BookController(final BookService bookService) {
        this .bookService = bookService;
    }

    @GetMapping(value = "/api/books")
    @ResponseBody
    public Iterable<Book> getAllBooks () {
        return bookService.getAll();
    }

    @GetMapping(value = "/api/books/{id}")
    @ResponseBody
    public Book getBook (@PathVariable("id") final Long id) {
        final Optional<Book> book = bookService.getById(id);
        if(book.isPresent()){
            return book.get();
        } else {
            throw new EntityNotFoundException("No book found with id " + id);
        }
    }

    @PostMapping(value = "/api/books")
    public void addBook(@RequestBody final Book book) {
        bookService.add(book);
    }

    @DeleteMapping(value= "/api/books/{id}")
    public void deleteBook(@PathVariable("id") final Long id) {
        bookService.delete(id);
    }

    @PutMapping(value = "/api/books/{id}")
    public void updateBook(@PathVariable("id") final Long id, @RequestBody final Book book) {
        bookService.update(id, book);
    }
}
