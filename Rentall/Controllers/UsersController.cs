using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.UserDto;
using Rentall.DAL.Model;
using Rentall.Services.UserService;

namespace Rentall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]

    public class UsersController : ControllerBase
    {
        private IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserByIdDto>> GetUserById(int id)
        {
            var user = await _usersService.GetUserById(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetUsersDto>>> GetUsers()
        {
            var users = await _usersService.GetUsers();
            if (!users.Any())
            {
                return BadRequest();
            }
            return users;
        }


        [HttpPost]
        public async Task<ActionResult<int>> AddUser([FromBody]AddUserDto userToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _usersService.AddUser(userToAdd);

            if (result == 0)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateUser([FromBody]AddUserDto userToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _usersService.UpdateUser(userToUpdate);

            if (result == 0)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var result = await _usersService.DeleteUser(id);

            if (result)
            {
                return Ok();
            }

            return BadRequest();


        }

    }
}