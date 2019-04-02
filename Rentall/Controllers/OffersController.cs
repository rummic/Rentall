using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.OfferDto;
using Rentall.Services.UserService;

namespace Rentall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class OffersController : ControllerBase
    {
        private IOffersService _offersService;

        public OffersController(IOffersService offersService)
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
    }
}
