using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.Services.Dtos;

namespace Rentall.Services.UserService
{
    public interface ICategoriesService
    {
        Task<ResponseDto<List<Category>>> GetCategories();
    }
}
