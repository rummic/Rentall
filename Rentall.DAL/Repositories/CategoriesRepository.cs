using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rentall.DAL.Config;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.DAL.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoriesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }
    }
}
