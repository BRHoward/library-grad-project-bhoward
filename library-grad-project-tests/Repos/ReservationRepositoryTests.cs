using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class ReservationRepositoryTests
    {
        [Fact]
        public void New_Reservation_Repository_Is_Empty()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);

            // Act
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Empty(Reservations);
        }

        [Fact]
        public void Add_Inserts_New_Reservation()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation newReservation = new Reservation() { bookId = 1 };

            // Act
            repo.Add(newReservation);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation }, Reservations.ToArray());
        }

        [Fact]
        public void Get_Returns_Specific_Reservation()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation newReservation1 = new Reservation() { Id = 0, bookId = 1 };
            Reservation newReservation2 = new Reservation() { Id = 1, bookId = 2 };
            repo.Add(newReservation1);
            repo.Add(newReservation2);

            // Act
            Reservation Reservation = repo.Get(1);

            // Asert
            Assert.Equal(newReservation2, Reservation);
        }

        [Fact]
        public void Get_All_Returns_All_Reservations()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation newReservation1 = new Reservation() { bookId = 1 };
            Reservation newReservation2 = new Reservation() { bookId = 2 };
            repo.Add(newReservation1);
            repo.Add(newReservation2);

            // Act
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation1, newReservation2 }, Reservations.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Reservation()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation newReservation1 = new Reservation() { Id = 0, bookId = 1 };
            Reservation newReservation2 = new Reservation() { Id = 1, bookId = 2 };
            Reservation newReservation3 = new Reservation() { Id = 2, bookId = 3 };
            repo.Add(newReservation1);
            repo.Add(newReservation2);
            repo.Add(newReservation3);

            // Act
            repo.Remove(1);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation1, newReservation3 }, Reservations.ToArray());
        }

        [Fact]
        public void Update_updates_Correct_Reservation()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation oldReservation = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };
            Reservation newReservation = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 3, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 4, 0, 0),
            };
            repo.Add(oldReservation);

            // Act
            repo.Update(newReservation, 0);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation }, Reservations.ToArray());
        }

        [Fact]
        public void Add_Doesnt_Insert_If_Times_Clash()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation Reservation1 = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };
            Reservation Reservation2 = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 30, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 30, 0),
            };

            repo.Add(Reservation1);
            Assert.Throws<InvalidOperationException>(() => repo.Add(Reservation2));
            IEnumerable<Reservation> Reservations = repo.GetAll();
            Assert.Equal(new Reservation[] { Reservation1 }, Reservations.ToArray());
        }

        [Fact]
        public void Put_Doesnt_Update_If_Times_Clash()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            ReservationRepository repo = new ReservationRepository(mockContext);
            Reservation Reservation1 = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };
            Reservation Reservation2 = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 30, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 30, 0),
            };
            repo.Add(Reservation1);

            Assert.Throws<InvalidOperationException>(() => repo.Update(Reservation2, 0));
            IEnumerable<Reservation> Reservations = repo.GetAll();
            Assert.Equal(new Reservation[] { Reservation1 }, Reservations.ToArray());
        }
    }
}
