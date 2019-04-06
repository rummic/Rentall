namespace Rentall.Services.ModelServices.OfferTypeService
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;

    public interface IOfferTypesService
    {
        Task<ResponseDto<List<OfferType>>> GetOfferTypes();
    }
}
