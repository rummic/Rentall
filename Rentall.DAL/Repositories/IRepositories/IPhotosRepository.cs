namespace Rentall.DAL.Repositories.IRepositories
{
    using System.Threading.Tasks;

    using Rentall.DAL.Model;

    public interface IPhotosRepository
    {
        Task<bool> AddPhoto(Photo photo);
    }
}
