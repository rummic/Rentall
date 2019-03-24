using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.UserDto;
using Rentall.Commons.ErrorMessages;
using Rentall.Commons.ExtensionMethods;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.Services.UserService
{
    public class UsersService : IUsersService
    {
        private IUsersRepository _usersRepository;
        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
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
                userToDb.Password = userToAdd.Password.GenerateSaltedHash(CreateSalt(30));
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
                mappedUser.Password = userToUpdate.Password.GenerateSaltedHash(CreateSalt(30));
                var result = await _usersRepository.UpdateUser(mappedUser);
                response.Value = result;
                return response;
            }
            response.AddError(UserErrors.NotFoundByLogin);
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteUser(int id)
        {
            var response = new ResponseDto<bool>();
            var userFromDb = await _usersRepository.GetUserById(id);
            if (userFromDb == null || userFromDb.IsDeleted)
            {
                response.AddError(UserErrors.NotFoundById);
                return response;
            }
            var result = await _usersRepository.DeleteUser(id);
            response.Value = result;
            return response;
        }
        private static byte[] CreateSalt(int size)
        {
            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);
            return buff;
        }

    }
}
