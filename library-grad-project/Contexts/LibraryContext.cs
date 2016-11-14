using LibraryGradProject.Models;
using System.Data.Entity;

namespace LibraryGradProject.Contexts
{
    public class LibraryContext : DbContext, ILibraryContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}