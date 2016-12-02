using LibraryGradProject.Models;
using RaraAvis.nCubed.Core.Testing.Infrastructure.TestDbSet;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryGradProject.Contexts
{
    public class LibraryContextMock : ILibraryContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public LibraryContextMock()
        {
            Books = new InMemoryDbSet<Book>();
            Reservations = new InMemoryDbSet<Reservation>();
        }

        public void Dispose()
        {
        }

        public int SaveChanges()
        {
            return 1;
        }
    }
}
