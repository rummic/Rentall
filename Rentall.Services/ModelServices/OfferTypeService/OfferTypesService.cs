namespace Rentall.Services.ModelServices.OfferTypeService
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;

    public class OfferTypesService : IOfferTypesService
    {
        private readonly IOfferTypesRepository _offerTypesRepository;

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
