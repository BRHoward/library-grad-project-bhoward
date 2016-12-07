package com.scottlogic.web;


import com.scottlogic.domain.Book;
import com.scottlogic.service.BookService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {BookController.class})
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

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


    @Test
    public void shouldGetBookById() throws Exception {
        when(bookService.getById(0L)).thenReturn(Optional.of(testBook1));

        mockMvc.perform(get("/api/books/{id}", 0L))
                .andExpect(content().contentType(MediaType.ALL.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Test Book")))
                .andExpect(jsonPath("$.author", is("Test Author")))
                .andExpect(jsonPath("$.publishDate", is("Test Publish Date")))
                .andExpect(jsonPath("$.isbn", is("Test ISBN")));
    }

    @Test
    public void shouldGetAllBooks() throws Exception {
        when(bookService.getAll()).thenReturn(Arrays.asList(testBook1, testBook2));

        mockMvc.perform(get("/api/books/"))
                .andExpect(content().contentType(MediaType.ALL.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("Test Book")))
                .andExpect(jsonPath("$[0].author", is("Test Author")))
                .andExpect(jsonPath("$[0].publishDate", is("Test Publish Date")))
                .andExpect(jsonPath("$[0].isbn", is("Test ISBN")))
                .andExpect(jsonPath("$[1].title", is("Test Book 2")))
                .andExpect(jsonPath("$[1].author", is("Test Author 2")))
                .andExpect(jsonPath("$[1].publishDate", is("Test Publish Date 2")))
                .andExpect(jsonPath("$[1].isbn", is("Test ISBN 2")));
    }

    @Test
    public void shouldAddBook() throws Exception {
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(testBook1)))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldDeleteBook() throws Exception {
        mockMvc.perform(delete("/api/books/{id}", 0L))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldUpdateBook() throws Exception {
        mockMvc.perform(put("/api/books/{id}", 0L)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(testBook1)))
                .andExpect(status().isOk());
    }

    public String asJsonString(final Object object) throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }

}
