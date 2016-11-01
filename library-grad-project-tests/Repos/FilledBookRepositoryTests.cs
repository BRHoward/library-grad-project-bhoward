using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
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
            FilledBookRepository repo = new FilledBookRepository();
            Book book1 = new Book { Id = 0, Title = "Tennis", ISBN = "11111", Author = "Andy Murray", PublishDate = "01/01/2001" };
            Book book2 = new Book { Id = 1, Title = "All about tennis", ISBN = "22222", Author = "Tim Henman", PublishDate = "02/02/2002" };
            Book book3 = new Book { Id = 2, Title = "Yeah tennis", ISBN = "33333", Author = "Boris Becker", PublishDate = "03/03/2003" };

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Assert
            Assert.Equal(new Book[] { book1, book2, book3 }, books.ToArray());
        }
    }
}