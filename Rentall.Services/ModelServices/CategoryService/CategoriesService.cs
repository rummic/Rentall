﻿namespace Rentall.Services.ModelServices.CategoryService
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;

    public class CategoriesService : ICategoriesService
    {
        private readonly ICategoriesRepository _categoriesRepository;

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
