namespace Rentall.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.Commons.Enumerables;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.UserDto;
    using Rentall.Services.ModelServices.UserService;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginUserDto userParam)
        {
            var userResult = await _usersService.Authenticate(userParam);

            if (userResult.HasErrors)
            {
                return BadRequest(userResult);
            }

            return Ok(userResult);
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
        [Authorize(Roles = Role.Admin + ", " + Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<List<GetUsersDto>>>> GetUsers()
        {
            var usersResponse = await _usersService.GetUsers();
            if (usersResponse.HasErrors)
            {
                return BadRequest(usersResponse);
            }

            return Ok(usersResponse);
        }

        [HttpPost]
        [AllowAnonymous]
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
        [Authorize(Roles = Role.User + ", " + Role.SuperAdmin)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var result = await _usersService.DeleteUser(User, id);
            if (result.Value)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}