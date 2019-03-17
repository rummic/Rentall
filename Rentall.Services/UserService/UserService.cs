using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.Services.UserService
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);
            return user;
        }
    }
}
