package com.scottlogic.web;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottlogic.domain.Book;
import com.scottlogic.domain.Reservation;
import com.scottlogic.service.ReservationService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {ReservationController.class})
public class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReservationService reservationService;

    private Book testBook1;
    private Book testBook2;
    private Reservation testReservation1;
    private Reservation testReservation2;

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
        testReservation1 = new Reservation(
                testBook1,
                new Date(5000),
                new Date(6000)
        );
        testReservation2 = new Reservation(
                testBook2,
                new Date(5000),
                new Date(6000)
        );
    }

    @Test
    public void shouldGetReservationById() throws Exception {
        when(reservationService.getById(0L)).thenReturn(Optional.of(testReservation1));

        mockMvc.perform(get("/api/reservations/{id}", 0L))
                .andExpect(content().contentType(MediaType.ALL.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.startDate", is(5000)))
                .andExpect(jsonPath("$.endDate", is(6000)));
    }

    @Test
    public void shouldGetAllBooks() throws Exception {
        when(reservationService.getAll()).thenReturn(Arrays.asList(testReservation1, testReservation2));

        mockMvc.perform(get("/api/reservations/"))
                .andExpect(content().contentType(MediaType.ALL.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].startDate", is(5000)))
                .andExpect(jsonPath("$[0].endDate", is(6000)))
                .andExpect(jsonPath("$[1].startDate", is(5000)))
                .andExpect(jsonPath("$[1].endDate", is(6000)));
    }

    @Test
    public void shouldAddReservation() throws Exception {
        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(testReservation1)))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldDeleteBook() throws Exception {
        mockMvc.perform(delete("/api/reservations/{id}", 0L))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldUpdateBook() throws Exception {
        mockMvc.perform(put("/api/reservations/{id}", 0L)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(testReservation1)))
                .andExpect(status().isOk());
    }

    public String asJsonString(final Object object) throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
