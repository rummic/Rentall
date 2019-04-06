namespace Rentall.DAL.Repositories.IRepositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;

    public interface IOfferTypesRepository
    {
        Task<IEnumerable<OfferType>> GetOfferTypes();
        Task<OfferType> GetOfferTypeById(int offerOfferTypeId);
    }
}
