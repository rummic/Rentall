using System.Collections.Generic;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.Services.Dtos;

namespace Rentall.Services.ModelServices.CategoryService
{
    public interface ICategoriesService
    {
        Task<ResponseDto<List<Category>>> GetCategories();
    }
}
