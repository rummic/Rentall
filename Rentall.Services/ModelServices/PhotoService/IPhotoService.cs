using Rentall.DAL.Model;
using Rentall.Services.Dtos.PhotoDto;

namespace Rentall.Services.ModelServices.PhotoService
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.UserDto;

    public interface IPhotoService
    {

        Task<ResponseDto<string>> AddPhoto(IFormFile photo, int offerId);
        Task<ResponseDto<bool>> ChangePhotoActivity(string photoPath);
        Task<ResponseDto<GetPhotoByPathDto>> GetPhotoByPath(string photoPath);
    }
}
