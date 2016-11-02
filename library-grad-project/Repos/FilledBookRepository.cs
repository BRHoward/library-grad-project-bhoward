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
        private int currentId;

        public FilledBookRepository()
        {
            _bookCollection = new List<Book>
            {
                new Book {Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate="01/01/2001"},
                new Book {Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate="02/02/2002"},
                new Book {Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate="03/03/2003"}
            };
            currentId = 3;
        }

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