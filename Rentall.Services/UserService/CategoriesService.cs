using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;
using Rentall.Services.Dtos;

namespace Rentall.Services.UserService
{
    public class CategoriesService : ICategoriesService
    {
        private ICategoriesRepository _categoriesRepository;

        public CategoriesService(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }
        public async Task<ResponseDto<List<Category>>> GetCategories()
        {
            var response = new ResponseDto<List<Category>>();
            var categoriesFromDb = await _categoriesRepository.GetCategories();
            response.Value = categoriesFromDb.ToList();
            return response;
        }
    }
}
