using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class FilledBookRepository : IRepository<Book>
    {
        private ILibraryContext _dbContext;

        public FilledBookRepository(ILibraryContext dbContext)
        {
            _dbContext = dbContext;
            if (_dbContext.Books.Count() == 0)
            {
                _dbContext.Books.Add(new Book { title = "Tennis", isbn = "11111", author = "Andy Murray", publishDate = "01/01/2001" });
                _dbContext.Books.Add(new Book { title = "All about tennis", isbn = "22222", author = "Tim Henman", publishDate = "02/02/2002" });
                _dbContext.Books.Add(new Book { title = "Yeah tennis", isbn = "33333", author = "Boris Becker", publishDate = "03/03/2003" });
            }
            _dbContext.SaveChanges();
        }

        public void Add(Book entity)
        {
            _dbContext.Books.Add(entity);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Book> GetAll()
        {
            return _dbContext.Books.OrderBy(b => b.id).ToList();
        }

        public Book Get(int id)
        {
            return _dbContext.Books
                .OrderBy(b => b.id)
                .Where(b => b.id == id)
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