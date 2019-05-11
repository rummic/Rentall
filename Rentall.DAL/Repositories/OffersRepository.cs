namespace Rentall.DAL.Repositories
{
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using Rentall.DAL.Config;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;

    public class OffersRepository : IOffersRepository
    {
        private readonly ApplicationDbContext _context;

        public OffersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Offer> GetOfferById(int id)
        {
            var offer = await _context.Offers.Include(x => x.User)
                                             .Include(x => x.Category)
                                             .Include(x => x.OfferType)
                                             .Include(x => x.Photos)
                                             .FirstOrDefaultAsync(x => x.Id == id);
            return offer;
        }

        public async Task<Offer> GetOfferByTitle(string title)
        {
            var offer = await _context.Offers.FirstOrDefaultAsync(x => x.Title == title);
            return offer;
        }

        public async Task<IEnumerable<Offer>> GetOffers()
        {
            var offers = await _context.Offers.Include(x => x.Photos).Include(x => x.User).Include(x => x.Category).Include(x => x.OfferType).ToListAsync();
            return offers;
        }

        public async Task<IEnumerable<Offer>> GetOffersByQuery(string query, List<SqlParameter> sqlParameters)
        {
            var offers = await _context.Offers.FromSql(query, sqlParameters.ToArray()).Include(x => x.Photos).Include(x => x.User).Include(x => x.Category).Include(x => x.OfferType).ToListAsync();
            //var offers = await _context.Offers.FromSql($"SELECT * FROM Offers WHERE Active = 1 AND LOWER(Title) LIKE '%'+@title+'%'",new SqlParameter("@title", "Mieszkanie na wynajem")).Include(x => x.Photos).Include(x => x.User).Include(x => x.Category).Include(x => x.OfferType).ToListAsync();
            return offers;
        }

        public async Task<int> AddOffer(Offer offer)
        {
            await _context.Offers.AddAsync(offer);
            await _context.SaveChangesAsync();
            return offer.Id;
        }

        public async Task<int> UpdateOffer(Offer offerFromDb, Offer offer)
        {
            offerFromDb.Title = offer.Title;
            offerFromDb.Description = offer.Description;
            offerFromDb.Price = offer.Price;
            offerFromDb.Area = offer.Area;
            offerFromDb.MapLink = offer.MapLink;
            offerFromDb.Level = offer.Level;
            offerFromDb.RoomCount = offer.RoomCount;
            offerFromDb.City = offer.City;
            offerFromDb.Street = offer.Street;
            offerFromDb.ZipCode = offer.ZipCode;
            offerFromDb.Active = offer.Active;
            offerFromDb.CreateDate = offer.CreateDate;
            offerFromDb.Category = offer.Category;
            offerFromDb.OfferType = offer.OfferType;
            offerFromDb.User = offer.User;
            await _context.SaveChangesAsync();
            return offerFromDb.Id;
        }

        public async Task<bool> DeleteOffer(Offer offer)
        {
            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangeOfferActivity(Offer offer)
        {
            offer.Active = !offer.Active;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Offer>> GetOffersByUser(User userFromDb)
        {
            var offers = await _context.Offers.Where(x => x.User == userFromDb)
                                              .Include(x => x.Category)
                                              .Include(x => x.OfferType)
                                              .Include(x => x.Photos)
                                              .ToListAsync();
            return offers;
        }
    }
}
