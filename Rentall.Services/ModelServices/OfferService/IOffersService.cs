namespace Rentall.Services.ModelServices.OfferService
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;

    public interface IOffersService
    {
        Task<ResponseDto<int>> AddOffer(ClaimsPrincipal user, AddOfferDto offer);
        Task<ResponseDto<List<GetOfferDto>>> GetRandomOffers(int count);
        Task<ResponseDto<GetOfferDto>> GetOfferById(int id);
        Task<ResponseDto<List<GetOfferDto>>> GetOffersByUser(string userLogin);
        Task<ResponseDto<List<GetOfferDto>>> GetOffersByQuery(string query);
        Task<ResponseDto<bool>> ChangeOfferActivity(ClaimsPrincipal user, int id);
        Task<ResponseDto<int>> UpdateOffer(ClaimsPrincipal user, UpdateOfferDto offer);
        Task<ResponseDto<bool>> DeleteOffer(ClaimsPrincipal userIdentity, int id);

        Task<ResponseDto<List<GetOfferDto>>> GetOffersAdvancedSearch(
            string title,
            string priceMin,
            string priceMax,
            int? areaMin,
            int? areaMax,
            int? level,
            int? roomCount,
            string city,
            string categoryId,
            string offerTypeId,
            int? page,
            int limit);
    }
}
