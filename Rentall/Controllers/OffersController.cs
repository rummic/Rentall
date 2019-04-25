namespace Rentall.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using Rentall.Commons.Enumerables;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;
    using Rentall.Services.ModelServices.OfferService;
    using System.Collections.Generic;
    using System.Threading.Tasks;

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
            ResponseDto<GetOfferByIdDto> offerResponse = await _offersService.GetOfferById(id);
            if (offerResponse.HasErrors)
            {
                return BadRequest(offerResponse);
            }

            return Ok(offerResponse);
        }

        [AllowAnonymous]
        [HttpGet("Main/{count}")]
        public async Task<ActionResult<ResponseDto<List<GetOfferByIdDto>>>> GetRandomOffers(int count = 1)
        {
            ResponseDto<List<GetOfferByIdDto>> result = await _offersService.GetRandomOffers(count);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("Query/{query}")]
        public async Task<ActionResult<ResponseDto<List<GetOfferByIdDto>>>> GetOffersByQuery(string query)
        {
            ResponseDto<List<GetOfferByIdDto>> result = await _offersService.GetOffersByQuery(query);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("User/{userLogin}")]
        public async Task<ActionResult<ResponseDto<List<GetOfferByIdDto>>>> GetOffersByUser(string userLogin)
        {
            ResponseDto<List<GetOfferByIdDto>> result = await _offersService.GetOffersByUser(userLogin);
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

            ResponseDto<int> result = await _offersService.AddOffer(User, offer);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPatch]
        public async Task<ActionResult<ResponseDto<bool>>> UpdateOffer([FromBody] UpdateOfferDto offer)
        {
            ResponseDto<int> result = await _offersService.UpdateOffer(User, offer);
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
            ResponseDto<bool> result = await _offersService.ChangeOfferActivity(id);
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
            ResponseDto<bool> result = await _offersService.DeleteOffer(User, id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
