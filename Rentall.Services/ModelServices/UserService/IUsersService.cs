namespace Rentall.Services.ModelServices.UserService
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.UserDto;

    public interface IUsersService
    {
        Task<ResponseDto<GetUserByIdDto>> GetUserById(int id);
        Task<ResponseDto<List<GetUsersDto>>> GetUsers(bool allUsers = false);
        Task<ResponseDto<int>> AddUser(AddUserDto userToAdd);
        Task<ResponseDto<int>> UpdateUser(ClaimsPrincipal loggedInUser, AddUserDto userToUpdate);
        Task<ResponseDto<bool>> DeleteUser(ClaimsPrincipal userIdentity, int id);
        Task<ResponseDto<LoggedInUserDto>> Authenticate(LoginUserDto loginUserDto);
    }
}
