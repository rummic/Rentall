namespace Rentall.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.ModelServices.OfferTypeService;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class OfferTypesController : ControllerBase
    {
        private readonly IOfferTypesService _offerTypesService;

        public OfferTypesController(IOfferTypesService offerTypesService)
        {
            _offerTypesService = offerTypesService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<ResponseDto<List<OfferType>>>> GetOfferTypes()
        {
            ResponseDto<List<OfferType>> offerTypesResponse = await _offerTypesService.GetOfferTypes();
            if (offerTypesResponse.HasErrors)
            {
                return BadRequest(offerTypesResponse);
            }

            return Ok(offerTypesResponse);
        }
    }
}
