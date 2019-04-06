namespace Rentall.DAL.Repositories.IRepositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;

    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(int offerCategoryId);
    }
}
