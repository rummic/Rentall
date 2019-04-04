using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;
using Rentall.Services.Dtos;

namespace Rentall.Services.ModelServices.OfferTypeService
{
    public class OfferTypesService : IOfferTypesService
    {
        private IOfferTypesRepository _offerTypesRepository;

        public OfferTypesService(IOfferTypesRepository offerTypesRepository)
        {
            _offerTypesRepository = offerTypesRepository;
        }

        public async Task<ResponseDto<List<OfferType>>> GetOfferTypes()
        {
            var response = new ResponseDto<List<OfferType>>();
            var offerTypesFromDb = await _offerTypesRepository.GetOfferTypes();
            response.Value = offerTypesFromDb.ToList();
            return response;
        }
    }
}
