﻿using LibraryGradProject.Controllers;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using Xunit;

namespace LibraryGradProjectTests.Controllers
{
    public class BooksControllerTests
    {
        [Fact]
        public void Get_Calls_Repo_GetAll()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Book>>();
            mockRepo.Setup(mock => mock.GetAll());
            BooksController controller = new BooksController(mockRepo.Object);

            // Act
            controller.Get();

            // Assert
            mockRepo.Verify(mock => mock.GetAll(), Times.Once);
        }

        [Fact]
        public void Get_With_Id_Calls_Repo_Get()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Book>>();
            mockRepo.Setup(mock => mock.Get(It.IsAny<int>()));
            BooksController controller = new BooksController(mockRepo.Object);

            // Act
            controller.Get(1);

            // Assert
            mockRepo.Verify(mock => mock.Get(It.Is<int>(x => x==1)), Times.Once);
        }

        [Fact]
        public void Post_With_Book_Calls_Repo_Add()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Book>>();
            mockRepo.Setup(mock => mock.Add(It.IsAny<Book>()));
            BooksController controller = new BooksController(mockRepo.Object);

            Book newBook = new Book() { title = "Test" };

            // Act
            controller.Post(newBook);

            // Assert
            mockRepo.Verify(mock => mock.Add(It.Is<Book>(b => b == newBook)), Times.Once);
        }

        [Fact]
        public void Delete_With_Id_Calls_Repo_Remove()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Book>>();
            mockRepo.Setup(mock => mock.Remove(It.IsAny<int>()));
            BooksController controller = new BooksController(mockRepo.Object);

            // Act
            controller.Delete(1);

            // Assert
            mockRepo.Verify(mock => mock.Remove(It.Is<int>(x => x == 1)), Times.Once);
        }

        [Fact]
        public void Put_With_Book_And_Id_Calls_Update()
        {
            // Arrange
            Book newBook = new Book() {
                title = "New title",
                author = "New author",
                isbn = "22222",
                publishDate = "2001"
            };
            var mockRepo = new Mock<IRepository<Book>>();
            mockRepo.Setup(mock => mock.Update(It.IsAny<Book>(), It.IsAny<int>()));
            BooksController controller = new BooksController(mockRepo.Object);

            // Act
            controller.Put(newBook, 1);

            // Assert
            mockRepo.Verify(mock => mock.Update(
                It.Is<Book>(b => b == newBook),
                It.Is<int>(x => x == 1)),
                Times.Once);
        }
    }
}
