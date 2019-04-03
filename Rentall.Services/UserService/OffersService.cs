using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Rentall.Commons.ErrorMessages;
using Rentall.DAL.Model;
using Rentall.DAL.Repositories.IRepositories;
using Rentall.Services.Dtos;
using Rentall.Services.Dtos.OfferDto;

namespace Rentall.Services.UserService
{
    public class OffersService : IOffersService
    {
        private IOffersRepository _offersRepository;
        private IUsersRepository _usersRepository;
        private ICategoriesRepository _categoriesRepository;
        private IOfferTypesRepository _offerTypesRepository;
        public OffersService(IOffersRepository offersRepository, IUsersRepository usersRepository, ICategoriesRepository categoriesRepository, IOfferTypesRepository offerTypesRepository)
        {
            _offersRepository = offersRepository;
            _usersRepository = usersRepository;
            _categoriesRepository = categoriesRepository;
            _offerTypesRepository = offerTypesRepository;
        }
        public async Task<ResponseDto<GetOfferByIdDto>> GetOfferById(int id)
        {
            var response = new ResponseDto<GetOfferByIdDto>();
            var offerFromDb = await _offersRepository.GetOfferById(id);
            if (offerFromDb == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            var mappedOffer = Mapper.Map<GetOfferByIdDto>(offerFromDb);
            response.Value = mappedOffer;
            return response;
        }

        public async Task<ResponseDto<int>> AddOffer(AddOfferDto offer)
        {
            var response = new ResponseDto<int>();
            var offerToDb = Mapper.Map<Offer>(offer);
            var userFromDb = await _usersRepository.GetUserByLogin(offer.UserLogin);
            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
            }
            var categoryFromDb = await _categoriesRepository.GetCategoryById(offer.CategoryId);
            if (categoryFromDb == null)
            {
                response.AddError(CategoryErrors.NotFoundById);
            }
            var offerTypeFromDb = await _offerTypesRepository.GetOfferTypeById(offer.OfferTypeId);
            if (offerTypeFromDb == null)
            {
                response.AddError(OfferTypeErrors.NotFoundById);
            }
            offerToDb.CreateDate = DateTime.Now;
            offerToDb.User = userFromDb;
            offerToDb.Category = categoryFromDb;
            offerToDb.OfferType = offerTypeFromDb;
            try
            {
                response.Value = await _offersRepository.AddOffer(offerToDb);
            }
            catch (Exception e)
            {
                response.AddError(OfferErrors.AddingError);
                Console.Error.WriteLine(e); //TODO proper logging 
            }

            return response;
        }
    }
}
