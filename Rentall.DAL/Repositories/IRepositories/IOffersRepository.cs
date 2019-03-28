using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;

namespace Rentall.DAL.Repositories.IRepositories
{
    public interface IOffersRepository
    {
        Task<Offer> GetOfferById(int id);
        Task<Offer> GetOfferByTitle(string title);
        Task<IEnumerable<Offer>> GetOffers();
        Task<int> AddOffer(Offer offer);
        Task<int> UpdateOffer(Offer offer);
        Task<bool> DeleteOffer(Offer offer);
    }
}
