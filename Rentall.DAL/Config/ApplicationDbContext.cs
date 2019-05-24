namespace Rentall.DAL.Config
{
    using System;

    using Microsoft.EntityFrameworkCore;

    using Rentall.Commons.ExtensionMethods;
    using Rentall.Commons.Helpers;
    using Rentall.DAL.Model;

    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OfferType> OfferTypes { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Photo> Photos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(LocalDb)\MSSQLLocalDb;Database=Rentall;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var salt = SaltCreator.CreateSalt();
            var user = new User
            {
                Email = "asd@asd.com",
                FirstName = "Adam",
                IsDeleted = false,
                LastName = "Kowalski",
                Login = "adam",
                Salt = salt,
                Password = "hehe".GenerateSaltedHash(salt),
                PhoneNumber = "123456789",
                Role = "SuperAdmin",
                Id = 1
            };
            var offerType = new OfferType
            {
                Id = 1,
                Type = "Wynajem"
            };
            var category = new Category
            {
                Id = 1,
                Name = "Mieszkania"
            };
            modelBuilder.Entity<User>().HasData(user);
            modelBuilder.Entity<Category>().HasData(category);
            modelBuilder.Entity<OfferType>().HasData(offerType);
            modelBuilder.Entity<Offer>(
                o =>
                    {
                        o.HasData(
                            new
                            {
                                UserId = 1,
                                Id = 1,
                                OfferTypeId = 1,
                                CategoryId = 1,
                                Active = true,
                                Area = 50,
                                City = "Olsztyn",
                                CreateDate = DateTime.UtcNow,
                                Description = "Fajnie mieszkanko elo dajcie $$$",
                                Level = 2,
                                MapLink = "http://niewiemjaktobedziedzialacxD.com",
                                Price = "1000",
                                RoomCount = 2,
                                Street = "Prosta",
                                Title = "Mieszkanie na wynajem",
                                ZipCode = "10-123"
                            });
                    });
        }
    }
}
