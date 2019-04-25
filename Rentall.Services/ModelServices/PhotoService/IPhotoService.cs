namespace Rentall.Services.ModelServices.PhotoService
{
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.PhotoDto;

    public interface IPhotoService
    {
        Task<ResponseDto<string>> AddPhoto(ClaimsPrincipal user, IFormFile photo, int offerId);
        Task<ResponseDto<GetPhotoByPathDto>> GetPhotoByPath(string photoPath);
        Task<ResponseDto<bool>> ChangePhotoActivity(string photoPath);
    }
}
