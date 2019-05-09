using System.Globalization;

namespace Rentall.Services.ModelServices.OfferService
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;

    public class OffersService : IOffersService
    {
        private readonly IOffersRepository _offersRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IOfferTypesRepository _offerTypesRepository;

        public OffersService(
            IOffersRepository offersRepository,
            IUsersRepository usersRepository,
            ICategoriesRepository categoriesRepository,
            IOfferTypesRepository offerTypesRepository)
        {
            _offersRepository = offersRepository;
            _usersRepository = usersRepository;
            _categoriesRepository = categoriesRepository;
            _offerTypesRepository = offerTypesRepository;
        }

        public async Task<ResponseDto<GetOfferDto>> GetOfferById(int id)
        {
            var response = new ResponseDto<GetOfferDto>();
            var offerFromDb = await _offersRepository.GetOfferById(id);
            if (offerFromDb == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            var mappedOffer = Mapper.Map<GetOfferDto>(offerFromDb);
            GetPhotosPaths(mappedOffer);
            response.Value = mappedOffer;
            return response;
        }

        public async Task<ResponseDto<int>> AddOffer(ClaimsPrincipal user, AddOfferDto offer) 
        {
            var response = new ResponseDto<int>();
            var offerToDb = Mapper.Map<Offer>(offer);
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            var categoryFromDb = await _categoriesRepository.GetCategoryById(offer.CategoryId);
            if (categoryFromDb == null)
            {
                response.AddError(CategoryErrors.NotFoundById);
                return response;
            }

            var offerTypeFromDb = await _offerTypesRepository.GetOfferTypeById(offer.OfferTypeId);
            if (offerTypeFromDb == null)
            {
                response.AddError(OfferTypeErrors.NotFoundById);
                return response;
            }

            offerToDb.Active = true;
            offerToDb.CreateDate = DateTime.Now;
            offerToDb.User = userFromDb;
            offerToDb.Category = categoryFromDb;
            offerToDb.OfferType = offerTypeFromDb;

            try
            {
                response.Value = await _offersRepository.AddOffer(offerToDb);
            }
            catch
            {
                response.AddError(OfferErrors.AddingError);
            }

            return response;
        }

        public async Task<ResponseDto<bool>> ChangeOfferActivity(ClaimsPrincipal userIdentity, int id)
        {
            var response = new ResponseDto<bool>();
            var offerFromDb = await _offersRepository.GetOfferById(id);
            if (offerFromDb == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            if (userIdentity.Identity.Name != offerFromDb.User.Login)
            {
                response.AddError(OfferErrors.NotAllowed);
                return response;
            }

            var result = await _offersRepository.ChangeOfferActivity(offerFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteOffer(ClaimsPrincipal userIdentity, int id)
        {
            var response = new ResponseDto<bool>();
            var offerFromDb = await _offersRepository.GetOfferById(id);
            if (offerFromDb == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            if (userIdentity.Identity.Name != offerFromDb.User.Login)
            {
                response.AddError(OfferErrors.NotAllowed);
                return response;
            }

            var result = await _offersRepository.DeleteOffer(offerFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferDto>>> GetOffersAdvancedSearch(SearchParameters searchParameters)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            var query = $"SELECT * FROM Offers WHERE Active = 1";
            if (!string.IsNullOrWhiteSpace(searchParameters.Title))
            {
                query += $" AND LOWER(Title) LIKE '%{searchParameters.Title}%'";
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PriceMin))
            {
                query += $" AND CAST(Price as DECIMAL(18,2)) >= {double.Parse(searchParameters.PriceMin, CultureInfo.InvariantCulture).ToString().Replace(',','.')}";
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PriceMax))
            {
                query += $" AND CAST(Price as DECIMAL(18,2)) <= {double.Parse(searchParameters.PriceMax, CultureInfo.InvariantCulture).ToString().Replace(',', '.')}";
            }

            if (searchParameters.AreaMin.HasValue)
            {
                query += $" AND Area >= {searchParameters.AreaMin}";
            }

            if (searchParameters.AreaMax.HasValue)
            {
                query += $" AND Area <= {searchParameters.AreaMax}";
            }

            if (searchParameters.Level.HasValue)
            {
                query += $" AND Level = {searchParameters.Level}";
            }

            if (searchParameters.RoomCount.HasValue)
            {
                query += $" AND RoomCount = {searchParameters.RoomCount}";
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.City))
            {
                query += $" AND LOWER(City) = '{searchParameters.City}'";
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.CategoryId))
            {
                query += $" AND CategoryId = {searchParameters.CategoryId}";
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.OfferTypeId))
            {
                query += $" AND OfferTypeId = {searchParameters.OfferTypeId}";
            }

            if (!searchParameters.Page.HasValue)
            {
                searchParameters.Page = 1;
            }

            query += $" ORDER BY Id OFFSET {searchParameters.Limit * (searchParameters.Page - 1)} ROWS FETCH NEXT {searchParameters.Limit} ROWS ONLY";
            var offersToMap = await _offersRepository.GetOffersByQuery(query);
            if (!offersToMap.Any())
            {
                response.AddError(OfferErrors.NotFoundByQuery);
                return response;
            }

            var mappedOffers = Mapper.Map<List<GetOfferDto>>(offersToMap);
            foreach (var mappedOffer in mappedOffers)
            {
                GetPhotosPaths(mappedOffer);
            }
            response.Value = mappedOffers;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferDto>>> GetRandomOffers(int count)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            var offersFromDb = await _offersRepository.GetOffers();
            var randomOffers = offersFromDb.OrderBy(x => Guid.NewGuid()).Take(count).ToList();
            
            var mappedRandomOffers = Mapper.Map<List<GetOfferDto>>(randomOffers);
            foreach (var mappedOffer in mappedRandomOffers)
            {
                GetPhotosPaths(mappedOffer);
            }

            response.Value = mappedRandomOffers;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferDto>>> GetOffersByQuery(string query)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            var querySplit = query.Split(" ");
            var offersFromDb = await _offersRepository.GetOffers();
            var offersToMap = offersFromDb.Where(x => querySplit.All(y => x.ToString().Contains(y.ToLowerInvariant())));
            if (!offersToMap.Any())
            {
                response.AddError(OfferErrors.NotFoundByQuery);
                return response;
            }

            var mappedOffers = Mapper.Map<List<GetOfferDto>>(offersToMap);
            foreach (var mappedOffer in mappedOffers)
            {
                GetPhotosPaths(mappedOffer);
            }

            response.Value = mappedOffers;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferDto>>> GetOffersByUser(string userLogin)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            var userFromDb = await _usersRepository.GetUserByLogin(userLogin);
            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            var offersFromDb = await _offersRepository.GetOffersByUser(userFromDb);
            if (!offersFromDb.Any())
            {
                response.AddError(OfferErrors.NotFoundOffersByUser);
                return response;
            }

            var mappedOffers = Mapper.Map<List<GetOfferDto>>(offersFromDb);
            foreach (var mappedOffer in mappedOffers)
            {
                GetPhotosPaths(mappedOffer);
            }

            response.Value = mappedOffers;
            return response;
        }

        public async Task<ResponseDto<int>> UpdateOffer(ClaimsPrincipal user, UpdateOfferDto offer)
        {
            var response = new ResponseDto<int>();
            var offerToDb = Mapper.Map<Offer>(offer);
            var offerFromDb = await _offersRepository.GetOfferById(offer.Id);
            if (offerFromDb == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            if (userFromDb.Login != offerFromDb.User.Login)
            {
                response.AddError(UserErrors.NotAllowed);
                return response;
            }

            var categoryFromDb = await _categoriesRepository.GetCategoryById(offer.CategoryId);
            if (categoryFromDb == null)
            {
                response.AddError(CategoryErrors.NotFoundById);
                return response;
            }

            var offerTypeFromDb = await _offerTypesRepository.GetOfferTypeById(offer.OfferTypeId);
            if (offerTypeFromDb == null)
            {
                response.AddError(OfferTypeErrors.NotFoundById);
                return response;
            }

            offerToDb.Active = true;
            offerToDb.CreateDate = DateTime.Now;
            offerToDb.User = userFromDb;
            offerToDb.Category = categoryFromDb;
            offerToDb.OfferType = offerTypeFromDb;

            try
            {
                response.Value = await _offersRepository.UpdateOffer(offerFromDb, offerToDb);
            }
            catch
            {
                response.AddError(OfferErrors.AddingError);
            }

            return response;
        }

        private static void GetPhotosPaths(GetOfferDto mappedOffer)
        {
            for (int i = 0; i < mappedOffer.Photos.Count; i++)
            {
                var split = mappedOffer.Photos[i].Split('\\');
                mappedOffer.Photos[i] = string.Join('/', split.Skip(split.Length - 2));
            }
        }
    }
}
