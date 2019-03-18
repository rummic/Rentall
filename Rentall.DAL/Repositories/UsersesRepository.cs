using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rentall.DAL.Config;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.DAL.Repositories
{
    public class UsersesRepository : IUsersRepository
    {
        private ApplicationDbContext _context;

        public UsersesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserById(int id, bool withTracking = true)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<User> GetUserByLogin(string login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Login == login);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<int> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<int> UpdateUser(User user)
        {
            var userFromDb = await GetUserById(user.Id);
            userFromDb.Email = user.Email;
            userFromDb.FirstName = user.FirstName;
            userFromDb.LastName = user.LastName;
            userFromDb.Password = user.Password;
            userFromDb.PhoneNumber = user.PhoneNumber;
            await _context.SaveChangesAsync();
            return userFromDb.Id;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var userFromDb = await GetUserById(id);
            userFromDb.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
