using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Rentall.Services.Dtos;
using Rentall.Services.Dtos.OfferDto;
using Rentall.Services.UserService;
using System.Threading.Tasks;

namespace Rentall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class OffersController : ControllerBase
    {
        private readonly IOffersService _offersService;

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
    }
}
