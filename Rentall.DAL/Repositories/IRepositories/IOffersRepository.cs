namespace Rentall.DAL.Repositories.IRepositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;

    public interface IOffersRepository
    {
        Task<Offer> GetOfferById(int id);
        Task<Offer> GetOfferByTitle(string title);
        Task<IEnumerable<Offer>> GetOffers();
        Task<int> AddOffer(Offer offer);
        Task<int> UpdateOffer(Offer offer);
        Task<bool> DeleteOffer(Offer offer);
        Task<bool> ChangeOfferActivity(int id);
        Task<IEnumerable<Offer>> GetOffersByUser(User userFromDb);
    }
}
