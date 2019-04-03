﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.Services.Dtos;
using Rentall.Services.Dtos.UserDto;

namespace Rentall.Services.UserService
{
    public interface IUsersService
    {
        Task<ResponseDto<GetUserByIdDto>> GetUserById(int id);
        Task<ResponseDto<List<GetUsersDto>>> GetUsers(bool allUsers = false);
        Task<ResponseDto<int>> AddUser(AddUserDto userToAdd);
        Task<ResponseDto<int>> UpdateUser(AddUserDto userToUpdate);
        Task<ResponseDto<bool>> DeleteUser(ClaimsPrincipal userIdentity, int id);
        Task<ResponseDto<LoggedInUserDto>> Authenticate(LoginUserDto loginUserDto);
    }
}
