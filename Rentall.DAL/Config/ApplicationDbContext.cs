using Microsoft.EntityFrameworkCore;
using Rentall.DAL.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.DAL.Config
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(LocalDb)\MSSQLLocalDb;Database=Rentall;Trusted_Connection=True;");
        }
        public DbSet<User> Users { get; set; }
    }
}
