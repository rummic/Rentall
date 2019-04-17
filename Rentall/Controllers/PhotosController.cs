﻿namespace Rentall.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.Services.Dtos;
    using Rentall.Services.ModelServices.PhotoService;

    using Swashbuckle.AspNetCore.Swagger;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public PhotosController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        [HttpPost("{offerId}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<string>>> UploadPhoto(IFormFile photo, int offerId, [FromQuery]bool mainPhoto) //TODO flage na fotke która główna
        {
            var result = await _photoService.AddPhoto(photo, offerId, mainPhoto);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
