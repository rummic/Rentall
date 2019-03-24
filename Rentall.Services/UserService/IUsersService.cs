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
        Task<ResponseDto<GetUserByIdDto>> GetUserById(int id);
        Task<ResponseDto<List<GetUsersDto>>> GetUsers(bool allUsers = false);
        Task<ResponseDto<int>> AddUser(AddUserDto userToAdd);
        Task<ResponseDto<int>> UpdateUser(AddUserDto userToUpdate);
        Task<ResponseDto<bool>> DeleteUser(int id);
    }
}
