using LibraryGradProject.Models;
using LibraryGradProject.Repos;
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
            ReservationRepository repo = new ReservationRepository();

            // Act
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Empty(Reservations);
        }

        [Fact]
        public void Add_Inserts_New_Reservation()
        {
            // Arrange
            ReservationRepository repo = new ReservationRepository();
            Reservation newReservation = new Reservation() { bookId = 1 };

            // Act
            repo.Add(newReservation);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation }, Reservations.ToArray());
        }

        [Fact]
        public void Add_Sets_New_Id()
        {
            // Arrange
            ReservationRepository repo = new ReservationRepository();
            Reservation newReservation = new Reservation() { bookId = 2 };

            // Act
            repo.Add(newReservation);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(0, Reservations.First().Id);
        }

        [Fact]
        public void Get_Returns_Specific_Reservation()
        {
            // Arrange
            ReservationRepository repo = new ReservationRepository();
            Reservation newReservation1 = new Reservation() { bookId = 1 };
            Reservation newReservation2 = new Reservation() { bookId = 2 };
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
            ReservationRepository repo = new ReservationRepository();
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
            ReservationRepository repo = new ReservationRepository();
            Reservation newReservation1 = new Reservation() { bookId = 1 };
            Reservation newReservation2 = new Reservation() { bookId = 2 };
            Reservation newReservation3 = new Reservation() { bookId = 3 };
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
            ReservationRepository repo = new ReservationRepository();
            Reservation oldReservation = new Reservation()
            {
                bookId = 1,
                StartDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                EndDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };
            Reservation newReservation = new Reservation()
            {
                bookId = 1,
                StartDate = new System.DateTime(2016, 1, 1, 3, 0, 0),
                EndDate = new System.DateTime(2016, 1, 1, 4, 0, 0),
            };
            repo.Add(oldReservation);

            // Act
            repo.Update(newReservation, 0);
            IEnumerable<Reservation> Reservations = repo.GetAll();

            // Asert
            Assert.Equal(new Reservation[] { newReservation }, Reservations.ToArray());
        }
    }
}
