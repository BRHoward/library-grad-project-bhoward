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
            entity.Id = currentId;
            currentId++;
            _reservationCollection.Add(entity);
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
    }
}