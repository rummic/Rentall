namespace Rentall.DAL.Repositories.IRepositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;

    public interface IOffersRepository
    {
        Task<int> AddOffer(Offer offer);
        Task<Offer> GetOfferById(int id);
        Task<Offer> GetOfferByTitle(string title);
        Task<IEnumerable<Offer>> GetOffersByUser(User userFromDb);
        Task<IEnumerable<Offer>> GetOffers();
        Task<IEnumerable<Offer>> GetOffersByQuery(string query);
        Task<int> UpdateOffer(Offer offerFromDb, Offer offer);
        Task<bool> ChangeOfferActivity(int id);
        Task<bool> DeleteOffer(Offer offer);
    }
}
