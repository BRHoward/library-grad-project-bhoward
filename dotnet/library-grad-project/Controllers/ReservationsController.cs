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

        public ReservationsController()
        {

        }

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
        public IHttpActionResult Post(Reservation newReservation)
        {
            try
            {
                _reservationRepo.Add(newReservation);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/reservations/{int}
        public void Delete(int id)
        {
            _reservationRepo.Remove(id);
        }

        // PUT api/reservations/{int}
        public IHttpActionResult Put(Reservation newReservation, int id)
        {

            try
            {
                _reservationRepo.Update(newReservation, id);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            
        }
    }
}