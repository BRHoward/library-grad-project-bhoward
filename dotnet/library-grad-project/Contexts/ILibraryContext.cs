using LibraryGradProject.Models;
using System;
using System.Data.Entity;

namespace LibraryGradProject.Contexts
{
    public interface ILibraryContext : IDisposable
    {
        DbSet<Book> Books { get; set; }
        DbSet<Reservation> Reservations { get; set; }
        int SaveChanges();
    }
}