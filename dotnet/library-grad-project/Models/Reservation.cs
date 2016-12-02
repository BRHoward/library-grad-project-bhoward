using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class Reservation
    {
        public int id { get; set; }
        public int bookId { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to reservation return false.
            Reservation p = obj as Reservation;
            if ((System.Object)p == null)
            {
                return false;
            }

            // Return true if the fields match:
            return
                (bookId == p.bookId) &&
                (startDate == p.startDate) &&
                (endDate == p.endDate);
        }
    }
}