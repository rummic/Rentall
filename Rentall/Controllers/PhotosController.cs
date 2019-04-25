namespace Rentall.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.PhotoDto;
    using Rentall.Services.ModelServices.PhotoService;

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
        public async Task<ActionResult<ResponseDto<GetPhotoByPathDto>>> GetPhotoByPath(string photoPath) // TODO PO CO TA METODA
        {
            ResponseDto<GetPhotoByPathDto> result = await _photoService.GetPhotoByPath(photoPath);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("{offerId}")]
        public async Task<ActionResult<ResponseDto<string>>> UploadPhoto(IFormFile photo, int offerId)
        {
            ResponseDto<string> result = await _photoService.AddPhoto(User, photo, offerId);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut("{photoPath}")]
        public async Task<ActionResult<ResponseDto<bool>>> ChangePhotoActivity(string photoPath)
        {
            ResponseDto<bool> result = await _photoService.ChangePhotoActivity(photoPath);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
