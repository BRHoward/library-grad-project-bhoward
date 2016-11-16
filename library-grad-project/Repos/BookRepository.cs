using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private ILibraryContext _dbContext;

        public BookRepository(ILibraryContext dbContext)
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
                bookToUpdate.title = newBook.title;
                bookToUpdate.author = newBook.author;
                bookToUpdate.isbn = newBook.isbn;
                bookToUpdate.publishDate = newBook.publishDate;
                _dbContext.SaveChanges();
            }
            else
            {
                Add(newBook);
            }
        }
    }
}