namespace Rentall.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Hosting;
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
        private readonly List<string> _allowedExtensions = new List<string> { "jpeg", "jpg", "png" };

        private readonly IOffersService _offersService;

        private readonly IHostingEnvironment _hostingEnvironment;

        public OffersController(IOffersService offersService, IHostingEnvironment hostingEnvironment)
        {
            _offersService = offersService;
            _hostingEnvironment = hostingEnvironment;
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

        [HttpPost("Photo")]
        public async Task<ActionResult<ResponseDto<bool>>> UploadPhoto(PhotoUploadDto photo)
        {
            var result = new ResponseDto<bool>();
            var file = photo.File;
            string folder = Path.Combine(_hostingEnvironment.WebRootPath, "Photos");
            string filePath = Path.Combine(folder, file.FileName);
            photo.SourcePath = filePath;
            photo.Extension = Path.GetExtension(file.FileName).Substring(1);
            if (_allowedExtensions.All(x => x != photo.Extension))
            {
                result.AddError(PhotoErrors.WrongExtension);
                result.Value = false;
                return result;
            }

            if (file.Length > 0)
            {
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }
            }

            result.Value = true;
            return Ok(result);
        }
    }
}
