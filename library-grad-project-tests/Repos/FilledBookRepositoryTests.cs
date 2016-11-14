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
            Book book1 = new Book { Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" };
            Book book2 = new Book { Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" };
            Book book3 = new Book { Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" };

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
            Book newBook = new Book() { Title = "Test" };

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
            Book newBook1 = new Book() { Id = 0, Title = "Test1" };
            Book newBook2 = new Book() { Id = 1, Title = "Test2" };
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
            Book book1 = new Book { Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" };
            Book book2 = new Book { Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" };
            Book book3 = new Book { Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" };
            Book newBook1 = new Book() { Title = "Test1" };
            Book newBook2 = new Book() { Title = "Test2" };
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
            Book book1 = new Book { Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" };
            Book book2 = new Book { Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" };
            Book book3 = new Book { Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" };
            Book newBook1 = new Book() { Id = 3, Title = "Test1" };
            Book newBook2 = new Book() { Id = 4, Title = "Test2" };
            Book newBook3 = new Book() { Id = 5, Title = "Test3" };
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
            Book book1 = new Book { Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" };
            Book book2 = new Book { Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" };
            Book book3 = new Book { Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" };
            Book newBook = new Book()
            {
                Id = 3,
                Title = "New title",
                Author = "New Author",
                ISBN = "22222",
                PublishDate = "2001"
            };
            Book oldBook = new Book()
            {
                Id = 3,
                Title = "Old title",
                Author = "Old Author",
                ISBN = "11111",
                PublishDate = "2000"
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