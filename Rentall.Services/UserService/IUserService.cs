using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;

namespace Rentall.Services.UserService
{
    public interface IUserService
    {
        Task<User> GetUserById(int id);
    }
}
