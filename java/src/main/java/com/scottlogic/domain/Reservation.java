package com.scottlogic.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.boot.autoconfigure.condition.ConditionalOnJava;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {

    private Long id;

    private Book book;
    private Date startDate;
    private Date endDate;

    public Reservation() {
        // empty constructor required by hibernate
    }

    public Reservation(final Book book, final Date startDate, final Date endDate) {
        this.book = book;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JsonBackReference
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final Reservation reservation = (Reservation) o;

        return id.equals(reservation.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
