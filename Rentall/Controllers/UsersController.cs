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
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserByIdDto>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetUsersDto>>> GetUsers()
        {
            var users = await _userService.GetUsers();
            if (!users.Any())
            {
                return BadRequest();
            }
            return users;
        }
    }
}