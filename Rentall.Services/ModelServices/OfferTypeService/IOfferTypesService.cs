using System.Collections.Generic;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.Services.Dtos;

namespace Rentall.Services.ModelServices.OfferTypeService
{
    public interface IOfferTypesService
    {
        Task<ResponseDto<List<OfferType>>> GetOfferTypes();
    }
}
