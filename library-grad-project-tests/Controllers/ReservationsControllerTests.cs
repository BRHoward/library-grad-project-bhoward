using LibraryGradProject.Controllers;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using Xunit;

namespace LibraryGradProjectTests.Controllers
{
    public class ReservationsControllerTests
    {
        [Fact]
        public void Get_Calls_Repo_GetAll()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Reservation>>();
            mockRepo.Setup(mock => mock.GetAll());
            ReservationsController controller = new ReservationsController(mockRepo.Object);

            // Act
            controller.Get();

            // Assert
            mockRepo.Verify(mock => mock.GetAll(), Times.Once);
        }

        [Fact]
        public void Get_With_Id_Calls_Repo_Get()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Reservation>>();
            mockRepo.Setup(mock => mock.Get(It.IsAny<int>()));
            ReservationsController controller = new ReservationsController(mockRepo.Object);

            // Act
            controller.Get(1);

            // Assert
            mockRepo.Verify(mock => mock.Get(It.Is<int>(x => x == 1)), Times.Once);
        }

        [Fact]
        public void Post_With_Reservation_Calls_Repo_Add()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Reservation>>();
            mockRepo.Setup(mock => mock.Add(It.IsAny<Reservation>()));
            ReservationsController controller = new ReservationsController(mockRepo.Object);

            Reservation newReservation = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };

            // Act
            controller.Post(newReservation);

            // Assert
            mockRepo.Verify(mock => mock.Add(It.Is<Reservation>(b => b == newReservation)), Times.Once);
        }

        [Fact]
        public void Delete_With_Id_Calls_Repo_Remove()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<Reservation>>();
            mockRepo.Setup(mock => mock.Remove(It.IsAny<int>()));
            ReservationsController controller = new ReservationsController(mockRepo.Object);

            // Act
            controller.Delete(1);

            // Assert
            mockRepo.Verify(mock => mock.Remove(It.Is<int>(x => x == 1)), Times.Once);
        }

        [Fact]
        public void Put_With_Reservation_And_Id_Calls_Update()
        {
            // Arrange
            Reservation newReservation = new Reservation()
            {
                bookId = 1,
                startDate = new System.DateTime(2016, 1, 1, 1, 0, 0),
                endDate = new System.DateTime(2016, 1, 1, 2, 0, 0),
            };
            var mockRepo = new Mock<IRepository<Reservation>>();
            mockRepo.Setup(mock => mock.Update(It.IsAny<Reservation>(), It.IsAny<int>()));
            ReservationsController controller = new ReservationsController(mockRepo.Object);

            // Act
            controller.Put(newReservation, 1);

            // Assert
            mockRepo.Verify(mock => mock.Update(
                It.Is<Reservation>(b => b == newReservation),
                It.Is<int>(x => x == 1)),
                Times.Once);
        }
    }
}

