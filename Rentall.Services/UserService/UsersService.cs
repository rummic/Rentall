using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Rentall.Commons.ErrorMessages;
using Rentall.Commons.ExtensionMethods;
using Rentall.Commons.Helpers;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;
using Microsoft.Extensions.Options;
using Rentall.Services.Dtos;
using Rentall.Services.Dtos.UserDto;

namespace Rentall.Services.UserService
{
    public class UsersService : IUsersService
    {
        private IUsersRepository _usersRepository;
        private readonly IOptions<AppSettings> _appSettings;
        public UsersService(IUsersRepository usersRepository, IOptions<AppSettings> appSettings)
        {
            _usersRepository = usersRepository;
            _appSettings = appSettings;
        }

        public async Task<ResponseDto<GetUserByIdDto>> GetUserById(int id)
        {
            var response = new ResponseDto<GetUserByIdDto>();
            var userFromDb = await _usersRepository.GetUserById(id);
            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundById);
                return response;
            }
            var mappedUser = Mapper.Map<GetUserByIdDto>(userFromDb);
            response.Value = mappedUser;
            return response;
        }

        public async Task<ResponseDto<List<GetUsersDto>>> GetUsers(bool allUsers = false)
        {
            var response = new ResponseDto<List<GetUsersDto>>();
            var usersFromDb = await _usersRepository.GetUsers();
            var mappedUsers = allUsers ?
                Mapper.Map<List<GetUsersDto>>(usersFromDb) :
                Mapper.Map<List<GetUsersDto>>(usersFromDb.Where(x => !x.IsDeleted));
            response.Value = mappedUsers;
            return response;
        }

        public async Task<ResponseDto<int>> AddUser(AddUserDto userToAdd)
        {
            var response = new ResponseDto<int>();
            var userFromDb = await _usersRepository.GetUserByLogin(userToAdd.Login);
            if (userFromDb == null)
            {
                var userToDb = Mapper.Map<User>(userToAdd);
                userToDb.Salt = CreateSalt();
                userToDb.Password = userToAdd.Password.GenerateSaltedHash(userToDb.Salt);
                var result = await _usersRepository.AddUser(userToDb);
                response.Value = result;
                return response;
            }
            response.AddError(UserErrors.LoginTaken);
            return response;
        }

        public async Task<ResponseDto<int>> UpdateUser(AddUserDto userToUpdate)
        {
            var response = new ResponseDto<int>();
            var userFromDb = await _usersRepository.GetUserByLogin(userToUpdate.Login);
            if (userFromDb != null)
            {
                var mappedUser = Mapper.Map<User>(userToUpdate);
                mappedUser.Id = userFromDb.Id;
                if (!userFromDb.Password.IsEqualTo(userToUpdate.Password.GenerateSaltedHash(userFromDb.Salt)))
                {
                    mappedUser.Salt = CreateSalt();
                    mappedUser.Password = userToUpdate.Password.GenerateSaltedHash(mappedUser.Salt);
                }
                var result = await _usersRepository.UpdateUser(mappedUser);
                response.Value = result;
                return response;
            }
            response.AddError(UserErrors.NotFoundByLogin);
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteUser(ClaimsPrincipal userIdentity, int id)
        {
            var response = new ResponseDto<bool>();
            var userFromDb = await _usersRepository.GetUserById(id);
            if (userFromDb == null || userFromDb.IsDeleted)
            {
                response.AddError(UserErrors.NotFoundById);
                return response;
            }

            if (userIdentity.IsInRole("User") && userIdentity.Identity.Name != userFromDb.Login)
            {
                response.AddError(UserErrors.CannotDeleteUser);
            }
            var result = await _usersRepository.DeleteUser(id);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<LoggedInUserDto>> Authenticate(LoginUserDto loginUserDto)
        {
            var response = new ResponseDto<LoggedInUserDto>();
            var user = await _usersRepository.GetUserByLogin(loginUserDto.Login);
            if (user == null)
            {
                response.Errors.Add(UserErrors.NotFoundByLogin);
                return response;
            }

            if (!user.Password.IsEqualTo(loginUserDto.Password.GenerateSaltedHash(user.Salt)))
            {
                response.Errors.Add(UserErrors.InvalidPassword);
                return response;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);

            var subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.Role, user.Role)
            });

            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                   
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = signingCredentials
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            response.Value = new LoggedInUserDto()
            { Id = user.Id, Login = user.Login, Token = tokenHandler.WriteToken(token) };
            return response;
        }

        private static byte[] CreateSalt()
        {
            var size = 30;
            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);
            return buff;
        }

    }
}
