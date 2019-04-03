﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rentall.DAL.Config;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.DAL.Repositories
{
    public class OfferTypesRepository : IOfferTypesRepository
    {
        private readonly ApplicationDbContext _context;

        public OfferTypesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<OfferType>> GetOfferTypes()
        {
            var offerTypes = await _context.OfferTypes.ToListAsync();
            return offerTypes;
        }
    }
}
