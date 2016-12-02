using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class FilledBookRepositoryTests
    {
        [Fact]
        public void New_Filled_Book_Repository_Is_Filled()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book book1 = new Book { id = 0, title = "Tennis", isbn = "11111", author = "Andy Murray", publishDate = "01/01/2001" };
            Book book2 = new Book { id = 1, title = "All about tennis", isbn = "22222", author = "Tim Henman", publishDate = "02/02/2002" };
            Book book3 = new Book { id = 2, title = "Yeah tennis", isbn = "33333", author = "Boris Becker", publishDate = "03/03/2003" };

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Assert
            Assert.Equal(new Book[] { book1, book2, book3 }, books.ToArray());
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book newBook = new Book() { title = "Test" };

            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(books.Count(), 4);
        }

        [Fact]
        public void Get_Returns_Specific_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book newBook1 = new Book() { id = 0, title = "Test1" };
            Book newBook2 = new Book() { id = 1, title = "Test2" };
            repo.Add(newBook1);
            repo.Add(newBook2);

            // Act
            Book book = repo.Get(1);

            // Asert
            Assert.Equal(newBook2, book);
        }

        [Fact]
        public void Get_All_Returns_All_Books()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book book1 = new Book { id = 0, title = "Tennis", isbn = "11111", author = "Andy Murray", publishDate = "01/01/2001" };
            Book book2 = new Book { id = 1, title = "All about tennis", isbn = "22222", author = "Tim Henman", publishDate = "02/02/2002" };
            Book book3 = new Book { id = 2, title = "Yeah tennis", isbn = "33333", author = "Boris Becker", publishDate = "03/03/2003" };
            Book newBook1 = new Book() { title = "Test1" };
            Book newBook2 = new Book() { title = "Test2" };
            repo.Add(newBook1);
            repo.Add(newBook2);

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { book1, book2, book3, newBook1, newBook2 }, books.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book book1 = new Book { id = 0, title = "Tennis", isbn = "11111", author = "Andy Murray", publishDate = "01/01/2001" };
            Book book2 = new Book { id = 1, title = "All about tennis", isbn = "22222", author = "Tim Henman", publishDate = "02/02/2002" };
            Book book3 = new Book { id = 2, title = "Yeah tennis", isbn = "33333", author = "Boris Becker", publishDate = "03/03/2003" };
            Book newBook1 = new Book() { id = 3, title = "Test1" };
            Book newBook2 = new Book() { id = 4, title = "Test2" };
            Book newBook3 = new Book() { id = 5, title = "Test3" };
            repo.Add(newBook1);
            repo.Add(newBook2);
            repo.Add(newBook3);

            // Act
            repo.Remove(3);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { book1, book2, book3, newBook2, newBook3 }, books.ToArray());
        }

        [Fact]
        public void Update_updates_Correct_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            FilledBookRepository repo = new FilledBookRepository(mockContext);
            Book book1 = new Book { id = 0, title = "Tennis", isbn = "11111", author = "Andy Murray", publishDate = "01/01/2001" };
            Book book2 = new Book { id = 1, title = "All about tennis", isbn = "22222", author = "Tim Henman", publishDate = "02/02/2002" };
            Book book3 = new Book { id = 2, title = "Yeah tennis", isbn = "33333", author = "Boris Becker", publishDate = "03/03/2003" };
            Book newBook = new Book()
            {
                id = 3,
                title = "New title",
                author = "New author",
                isbn = "22222",
                publishDate = "2001"
            };
            Book oldBook = new Book()
            {
                id = 3,
                title = "Old title",
                author = "Old author",
                isbn = "11111",
                publishDate = "2000"
            };
            repo.Add(oldBook);

            // Act
            repo.Update(newBook, 3);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { book1, book2, book3, newBook }, books.ToArray());
        }
    }
}