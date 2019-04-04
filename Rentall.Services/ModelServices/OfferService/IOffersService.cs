using System.Threading.Tasks;
using Rentall.Services.Dtos;
using Rentall.Services.Dtos.OfferDto;

namespace Rentall.Services.ModelServices.OfferService
{
    public interface IOffersService
    {
        Task<ResponseDto<GetOfferByIdDto>> GetOfferById(int id);
        Task<ResponseDto<int>> AddOffer(AddOfferDto offer);
    }
}
