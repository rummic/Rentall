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
using Swashbuckle.AspNetCore.Swagger;

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
        public async Task<ActionResult<ResponseDto<GetUserByIdDto>>> GetUserById(int id)
        {
            var userResponse = await _usersService.GetUserById(id);
            if (userResponse.HasErrors)
            {
                return BadRequest(userResponse);
            }
            return Ok(userResponse);
        }
        [HttpGet]
        public async Task<ActionResult<ResponseDto<List<GetUsersDto>>>> GetUsers()
        {
            var usersResponse = await _usersService.GetUsers();
            if (!usersResponse.HasErrors)
            {
                return BadRequest(usersResponse);
            }
            return Ok(usersResponse);
        }


        [HttpPost]
        public async Task<ActionResult<ResponseDto<int>>> AddUser([FromBody]AddUserDto userToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _usersService.AddUser(userToAdd);

            if (result.HasErrors)
            {
                return BadRequest(result);
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

            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var result = await _usersService.DeleteUser(id);

            if (result.Value)
            {
                return Ok(result);
            }

            return BadRequest(result);


        }

    }
}