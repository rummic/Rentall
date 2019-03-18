using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.UserDto;
using Rentall.DAL.Model;

namespace Rentall.Services.UserService
{
    public interface IUsersService
    {
        Task<GetUserByIdDto> GetUserById(int id);
        Task<List<GetUsersDto>> GetUsers(bool allUsers = false);
        Task<int> AddUser(AddUserDto userToAdd);
        Task<int> UpdateUser(AddUserDto userToUpdate);
        Task<bool> DeleteUser(int id);
    }
}
