using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LibraryGradProject.Controllers
{
    public class ReservationsController : ApiController
    {
        private IRepository<Reservation> _reservationRepo;

        public ReservationsController(IRepository<Reservation> reservationRepository)
        {
            _reservationRepo = reservationRepository;
        }

        // GET api/reservations
        public IEnumerable<Reservation> Get()
        {
            return _reservationRepo.GetAll();
        }

        // GET api/reservations/{int}
        public Reservation Get(int id)
        {
            return _reservationRepo.Get(id);
        }

        // POST api/reservations
        public void Post(Reservation newReservation)
        {
            _reservationRepo.Add(newReservation);
        }

        // DELETE api/reservations/{int}
        public void Delete(int id)
        {
            _reservationRepo.Remove(id);
        }

        // PUT api/reservations/{int}
        public void Put(Reservation newReservation, int id)
        {
            Reservation reservationToUpdate = _reservationRepo.Get(id);
            if (reservationToUpdate != null)
            {   
                reservationToUpdate.bookId = newReservation.bookId;
                reservationToUpdate.StartDate = newReservation.StartDate;
                reservationToUpdate.EndDate = newReservation.EndDate;
            }
            else
            {
                _reservationRepo.Add(newReservation);
            }
        }
    }
}