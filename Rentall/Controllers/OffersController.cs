using Rentall.Commons.Enumerables;

namespace Rentall.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.Commons.ErrorMessages;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;
    using Rentall.Services.Dtos.UserDto;
    using Rentall.Services.ModelServices.OfferService;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class OffersController : ControllerBase
    {
        private readonly IOffersService _offersService;


        public OffersController(IOffersService offersService, IHostingEnvironment hostingEnvironment)
        {
            _offersService = offersService;
           
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDto<GetOfferByIdDto>>> GetOfferById(int id)
        {
            var offerResponse = await _offersService.GetOfferById(id);
            if (offerResponse.HasErrors)
            {
                return BadRequest(offerResponse);
            }

            return Ok(offerResponse);
        }

        [AllowAnonymous]
        [HttpGet("user/{userLogin}")]
        public async Task<ActionResult<ResponseDto<List<GetOfferByIdDto>>>> GetOffersByUser(string userLogin)
        {
            var result = await _offersService.GetOffersByUser(userLogin);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<ResponseDto<int>>> AddOffer([FromBody] AddOfferDto offer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _offersService.AddOffer(offer);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseDto<bool>>> ChangeOfferActivity(int id)
        {
            var result = await _offersService.ChangeOfferActivity(id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.User + ", " + Role.SuperAdmin)]
        public async Task<ActionResult> DeleteOffer(int id)
        {
            var result = await _offersService.DeleteOffer(User, id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
