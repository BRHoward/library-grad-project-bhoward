using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class ReservationRepository : IRepository<Reservation>
    {
        private ILibraryContext _dbContext;

        public ReservationRepository (ILibraryContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(Reservation entity)
        {
            if (reservationValid(entity))
            {
                _dbContext.Reservations.Add(entity);
                _dbContext.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("Book already reserved at that time");
            };

        }

        public IEnumerable<Reservation> GetAll()
        {
            return _dbContext.Reservations.OrderBy(r => r.Id).ToList();
        }

        public Reservation Get(int id)
        {
            return _dbContext.Reservations
                .OrderBy(b => b.Id)
                .Where(b => b.Id == id)
                .SingleOrDefault();
        }

        public void Remove(int id)
        {
            Reservation reservationToRemove = Get(id);
            _dbContext.Reservations.Remove(reservationToRemove);
            _dbContext.SaveChanges();
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
                _dbContext.SaveChanges();
            }
            else
            {
                Add(newReservation);
            }
        }

        private bool reservationValid(Reservation newReservation)
        {
            bool valid = true;

            foreach (var res in _dbContext.Reservations.OrderBy(r => r.Id).ToList())
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