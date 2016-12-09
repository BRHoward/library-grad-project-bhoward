using System.Collections.Generic;

namespace LibraryGradProject.Models
{
    public class Book
    {
        public int id { get; set; }
        public string isbn { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string publishDate { get; set; }

        public virtual ICollection<Reservation> reservations { get; set; }

        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to book return false.
            Book p = obj as Book;
            if ((System.Object)p == null)
            {
                return false;
            }

            // Return true if the fields match:
            return
                (title == p.title) &&
                (author == p.author) && 
                (isbn == p.isbn)&& 
                (publishDate == p.publishDate);
        }
    }
}