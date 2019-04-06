namespace Rentall.DAL.Repositories
{
    using System.Threading.Tasks;

    using Rentall.DAL.Config;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;

    public class PhotosRepository : IPhotosRepository
    {
        private readonly ApplicationDbContext _context;

        public PhotosRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddPhoto(Photo photo)
        {
            await _context.AddAsync(photo);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
