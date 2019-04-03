using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;

namespace Rentall.DAL.Repositories.IRepositories
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetCategories();
    }
}
