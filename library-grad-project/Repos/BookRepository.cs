using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private List<Book> _bookCollection = new List<Book>();
        private int currentId = 0;

        public void Add(Book entity)
        {
            entity.Id = currentId;
            currentId++;
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

        public void Update(Book newBook, int id)
        {
            Book bookToUpdate = Get(id);
            if (bookToUpdate != null)
            {
                bookToUpdate.Title = newBook.Title;
                bookToUpdate.Author = newBook.Author;
                bookToUpdate.ISBN = newBook.ISBN;
                bookToUpdate.PublishDate = newBook.PublishDate;
            }
            else
            {
                Add(newBook);
            }
        }
    }
}