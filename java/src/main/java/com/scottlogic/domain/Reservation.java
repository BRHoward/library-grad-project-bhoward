package com.scottlogic.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Reservation {

    private Long id;

    private Long bookId;
    private Date startDate;
    private Date endDate;

    public Reservation() {
        // empty constructor required by hibernate
    }

    public Reservation(final Long bookId, final Date startDate, final Date endDate) {
        this.bookId = bookId;
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

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
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
