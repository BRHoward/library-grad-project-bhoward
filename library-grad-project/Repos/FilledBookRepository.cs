using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class FilledBookRepository : IRepository<Book>
    {
        private LibraryContext _dbContext;

        public FilledBookRepository(LibraryContext dbContext)
        {
            _dbContext = dbContext;
            foreach (var book in _dbContext.Books)
            {
                dbContext.Books.Remove(book);
            }
            _dbContext.Books.Add(new Book { Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" });
            _dbContext.Books.Add(new Book { Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" });
            _dbContext.Books.Add(new Book { Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" });
            _dbContext.SaveChanges();
        }

        public void Add(Book entity)
        {
            _dbContext.Books.Add(entity);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Book> GetAll()
        {
            return _dbContext.Books.OrderBy(b => b.Id).ToList();
        }

        public Book Get(int id)
        {
            return _dbContext.Books
                .OrderBy(b => b.Id)
                .Where(b => b.Id == id)
                .SingleOrDefault();
        }

        public void Remove(int id)
        {
            Book bookToRemove = Get(id);
            _dbContext.Books.Remove(bookToRemove);
            _dbContext.SaveChanges();
        }

        public void Update(Book newBook, int id)
        {
            Book bookToUpdate = Get(id);
            if (bookToUpdate != null)
            {
                bookToUpdate.Title = newBook.Title;
                bookToUpdate.Author = newBook.Author;
                bookToUpdate.ISBN = newBook.ISBN;
                bookToUpdate.PublishDate = newBook.PublishDate;
                _dbContext.SaveChanges();
            }
            else
            {
                Add(newBook);
            }
        }
    }
}