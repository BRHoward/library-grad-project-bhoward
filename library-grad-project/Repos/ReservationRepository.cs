using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class ReservationRepository : IRepository<Reservation>
    {
        private List<Reservation> _reservationCollection = new List<Reservation>();
        private int currentId = 0;

        public void Add(Reservation entity)
        {
            if (reservationValid(entity))
            {
                entity.Id = currentId;
                currentId++;
                _reservationCollection.Add(entity);
            }
            else
            {
                throw new InvalidOperationException("Book already reserved at that time");
            };

        }

        public IEnumerable<Reservation> GetAll()
        {
            return _reservationCollection;
        }

        public Reservation Get(int id)
        {
            return _reservationCollection.Where(reservation => reservation.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            Reservation reservationToRemove = Get(id);
            _reservationCollection.Remove(reservationToRemove);
        }

        public void Update(Reservation newReservation, int id)
        {
            Reservation reservationToUpdate = Get(id);
            if (!reservationValid(newReservation))
            {
                throw new InvalidOperationException("Book already reserved at that time");
            }
            if (reservationToUpdate != null)
            {
                reservationToUpdate.bookId = newReservation.bookId;
                reservationToUpdate.StartDate = newReservation.StartDate;
                reservationToUpdate.EndDate = newReservation.EndDate;
            }
            else
            {
                Add(newReservation);
            }
        }

        private bool reservationValid(Reservation newReservation)
        {
            bool valid = true;

            foreach (Reservation res in _reservationCollection)
            {
                if (res.bookId == newReservation.bookId &&
                    res.StartDate < newReservation.EndDate && 
                    newReservation.StartDate < res.EndDate)
                {
                    valid = false;
                    break;
                }
            }

            return valid;
        }
    }
}