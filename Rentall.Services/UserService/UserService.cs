using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.UserDto;
using Rentall.Commons.ExtensionMethods;
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

        public async Task<GetUserByIdDto> GetUserById(int id)
        {
            var userFromDb = await _userRepository.GetUserById(id);
            var mappedUser = Mapper.Map<GetUserByIdDto>(userFromDb);
            return mappedUser;
        }

        public async Task<List<GetUsersDto>> GetUsers(bool allUsers = false)
        {
            var usersFromDb = await _userRepository.GetUsers();
            var mappedUsers = allUsers ?
                Mapper.Map<List<GetUsersDto>>(usersFromDb) :
                Mapper.Map<List<GetUsersDto>>(usersFromDb.Where(x => !x.IsDeleted));
            return mappedUsers;
        }

        public async Task<int> AddUser(AddUserDto userToAdd)
        {
            var userFromDb = await _userRepository.GetUserByLogin(userToAdd.Login);
            if (userFromDb == null)
            {
                var userToDb = Mapper.Map<User>(userToAdd);
                userToDb.Password = userToAdd.Password.GenerateSaltedHash(CreateSalt(30));
                var result = await _userRepository.AddUser(userToDb);
                return result;
            }

            return 0;
        }

        public async Task<int> UpdateUser(AddUserDto userToUpdate)
        {
            var userFromDb = await _userRepository.GetUserByLogin(userToUpdate.Login);
            if (userFromDb != null)
            {
                var mappedUser = Mapper.Map<User>(userToUpdate);
                mappedUser.Id = userFromDb.Id;
                mappedUser.Password = userToUpdate.Password.GenerateSaltedHash(CreateSalt(30));
                var result = await _userRepository.UpdateUser(mappedUser);
                return result;
            }

            return 0;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var userFromDb = await _userRepository.GetUserById(id);
            if (userFromDb == null || userFromDb.IsDeleted == true)
            {
                return false;
            }
            var result = await _userRepository.DeleteUser(id);
            return result;
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
