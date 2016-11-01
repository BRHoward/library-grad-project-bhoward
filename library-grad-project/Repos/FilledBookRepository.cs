using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class FilledBookRepository : IRepository<Book>
    {
        private List<Book> _bookCollection;

        public FilledBookRepository()
        {
            _bookCollection = new List<Book>
            {
                new Book {Title = "My First Book", ISBN = "11111", Author = "Andy Murray"},
                new Book {Title = "Another Book", ISBN = "22222", Author = "Tim Henman"},
                new Book {Title = "Yet more book", ISBN = "33333", Author = "Boris Becker"}
            };
        }

        public void Add(Book entity)
        {
            entity.Id = _bookCollection.Count;
            _bookCollection.Add(entity);
        }

        public IEnumerable<Book> GetAll()
        {
            return _bookCollection;
        }

        public Book Get(int id)
        {
            return _bookCollection.Where(book => book.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            Book bookToRemove = Get(id);
            _bookCollection.Remove(bookToRemove);
        }

    }
}