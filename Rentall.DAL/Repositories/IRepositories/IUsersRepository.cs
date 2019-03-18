using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;

namespace Rentall.DAL.Repositories.IRepositories
{
    public interface IUsersRepository
    {
        Task<User> GetUserById(int id, bool withTracking = true);
        Task<User> GetUserByLogin(string login);
        Task<IEnumerable<User>> GetUsers();
        Task<int> AddUser(User user);
        Task<int> UpdateUser(User user);
        Task<bool> DeleteUser(int id);
    }
}
