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
            Book relevantBook =_dbContext.Books
                        .OrderBy(b => b.id)
                        .Where(b => b.id == entity.book.id)
                        .SingleOrDefault();

            if(relevantBook == null)
            {
                throw new InvalidOperationException("That book doesn't exist");
            }

            entity.book = relevantBook;
            
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
            return _dbContext.Reservations
                .OrderBy(r => r.id)
                .ToList();
        }

        public Reservation Get(int id)
        {
            return _dbContext.Reservations
                .OrderBy(b => b.id)
                .Where(b => b.id == id)
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
                reservationToUpdate.book = newReservation.book;
                reservationToUpdate.startDate = newReservation.startDate;
                reservationToUpdate.endDate = newReservation.endDate;
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

            foreach (var res in _dbContext.Reservations.OrderBy(r => r.id).ToList())
            {
                if (res.book == newReservation.book &&
                    res.startDate < newReservation.endDate &&
                    newReservation.startDate < res.endDate)
                {
                    valid = false;
                    break;
                }
            }
            return valid;
        }
    }
}