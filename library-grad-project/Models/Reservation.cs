using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int bookId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}