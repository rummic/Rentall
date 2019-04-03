using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;
using Rentall.Services.Dtos;
using Rentall.Services.UserService;

namespace Rentall.Controllers
{
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
            var offerTypesResponse = await _offerTypesService.GetOfferTypes();
            if (offerTypesResponse.HasErrors)
            {
                return BadRequest(offerTypesResponse);
            }

            return Ok(offerTypesResponse);
        }
    }
}
