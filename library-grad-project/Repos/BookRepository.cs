using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private LibraryContext _dbContext;

        public BookRepository(LibraryContext dbContext)
        {
            _dbContext = dbContext;
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