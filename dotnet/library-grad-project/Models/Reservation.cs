using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        [ForeignKey("bookId")]
        public virtual Book book { get; set; }

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
                (book == p.book) &&
                (startDate == p.startDate) &&
                (endDate == p.endDate);
        }
    }
}