using System.Linq;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Photo> GetPhotoByPath(string photoPath)
        {
            photoPath = photoPath.Replace("%2F", "\\");
            var photo = await _context.Photos.Where(x => x.Path.Contains(photoPath)).FirstOrDefaultAsync();
            return photo;
        }

        public async Task<bool> ChangePhotoActivity(string photoPath)
        {
            var photoFromDb = await GetPhotoByPath(photoPath);
            photoFromDb.Active = !photoFromDb.Active;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
