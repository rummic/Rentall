namespace Rentall.DAL.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using Rentall.DAL.Config;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;

    public class OfferTypesRepository : IOfferTypesRepository
    {
        private readonly ApplicationDbContext _context;

        public OfferTypesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OfferType>> GetOfferTypes()
        {
            var offerTypes = await _context.OfferTypes.AsNoTracking().ToListAsync();
            return offerTypes;
        }

        public async Task<OfferType> GetOfferTypeById(int offerOfferTypeId)
        {
            var offerType = await _context.OfferTypes.FirstOrDefaultAsync(x => x.Id == offerOfferTypeId);
            return offerType;
        }
    }
}
