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
    public class OffersRepository : IOffersRepository
    {
        private ApplicationDbContext _context;

        public OffersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Offer> GetOfferById(int id)
        {
            var offer = await _context.Offers.Include(c => c.User).FirstOrDefaultAsync(x => x.Id == id);
            return offer;
        }

        public async Task<Offer> GetOfferByTitle(string title)
        {
            var offer = await _context.Offers.FirstOrDefaultAsync(x => x.Title == title);
            return offer;
        }

        public async Task<IEnumerable<Offer>> GetOffers()
        {
            var offers = await _context.Offers.ToListAsync();
            return offers;
        }

        public async Task<int> AddOffer(Offer offer)
        {
            await _context.Offers.AddAsync(offer);
            await _context.SaveChangesAsync();
            return offer.Id;
        }

        public async Task<int> UpdateOffer(Offer offer)
        {
            var offerFromDb = await GetOfferById(offer.Id);
            offerFromDb.Title = offer.Title;
            offerFromDb.Description = offer.Description;
            offerFromDb.Price = offer.Price;
            offerFromDb.Area = offer.Area;
            offerFromDb.MapLink = offer.MapLink;
            offerFromDb.Level = offer.Level;
            offerFromDb.RoomCount = offer.RoomCount;
            offerFromDb.City = offer.City;
            offerFromDb.Street = offer.Street;
            offerFromDb.ZipCode = offer.ZipCode;
            offerFromDb.Status = offer.Status;
            offerFromDb.CreateDate = offer.CreateDate;

            offerFromDb.Category = offer.Category;
            offerFromDb.OfferType = offer.OfferType;
            offerFromDb.User = offer.User;
            await _context.SaveChangesAsync();
            return offerFromDb.Id;
        }

        public async Task<bool> DeleteOffer(Offer offer)
        {
            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
