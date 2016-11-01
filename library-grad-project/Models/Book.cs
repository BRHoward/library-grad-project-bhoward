namespace LibraryGradProject.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string PublishDate { get; set; }

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
                (Title == p.Title) &&
                (Author == p.Author) && 
                (ISBN == p.ISBN)&& 
                (PublishDate == p.PublishDate);
        }
    }
}