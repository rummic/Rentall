using Rentall.DAL.Model;
using Rentall.Services.Dtos.PhotoDto;

namespace Rentall.Controllers
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

        [HttpGet("{photoPath}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<GetPhotoByPathDto>>> GetPhotoByPath(string photoPath)
        {
            var result = await _photoService.GetPhotoByPath(photoPath);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("{offerId}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<string>>> UploadPhoto(IFormFile photo, int offerId)
        {
            var result = await _photoService.AddPhoto(photo, offerId);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut("{photoPath}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<bool>>> ChangePhotoActivity(string photoPath)
        {
            var result = await _photoService.ChangePhotoActivity(photoPath);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }
            return  Ok(result);
        }
    }
}
