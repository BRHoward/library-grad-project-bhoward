using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookRepositoryTests
    {
        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            BookRepository repo = new BookRepository(mockContext);

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Empty(books);
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            BookRepository repo = new BookRepository(mockContext);
            Book newBook = new Book() { title = "Test" };

            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] {newBook}, books.ToArray());
        }

        [Fact]
        public void Get_Returns_Specific_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            BookRepository repo = new BookRepository(mockContext);
            Book newBook1 = new Book() { Id = 0, title = "Test1" };
            Book newBook2 = new Book() { Id = 1, title = "Test2" };
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
            BookRepository repo = new BookRepository(mockContext); ;
            Book newBook1 = new Book() { title = "Test1" };
            Book newBook2 = new Book() { title = "Test2" };
            repo.Add(newBook1);
            repo.Add(newBook2);

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook1, newBook2 }, books.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            BookRepository repo = new BookRepository(mockContext);
            Book newBook1 = new Book() {Id = 0, title = "Test1" };
            Book newBook2 = new Book() {Id = 1, title = "Test2" };
            Book newBook3 = new Book() {Id = 2, title = "Test3" };
            repo.Add(newBook1);
            repo.Add(newBook2);
            repo.Add(newBook3);

            // Act
            repo.Remove(1);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook1, newBook3 }, books.ToArray());
        }

        [Fact]
        public void Update_updates_Correct_Book()
        {
            // Arrange
            LibraryContextMock mockContext = new LibraryContextMock();
            BookRepository repo = new BookRepository(mockContext);
            Book newBook = new Book()
            {
                title = "New title",
                author = "New author",
                isbn = "22222",
                publishDate = "2001"
            };
            Book oldBook = new Book()
            {
                title = "Old title",
                author = "Old author",
                isbn = "11111",
                publishDate = "2000"
            };
            repo.Add(oldBook);

            // Act
            repo.Update(newBook, 0);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] {newBook}, books.ToArray());
        }
    }
}
