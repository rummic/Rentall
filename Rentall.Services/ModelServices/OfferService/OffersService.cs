namespace Rentall.Services.ModelServices.OfferService
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Globalization;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;
    using Rentall.Services.Validators;

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
            var offerFromDb = await _offersRepository.GetOfferById(id);

            ResponseDto<GetOfferDto> response = OffersValidator.ValidateGetOfferById(offerFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            var mappedOffer = Mapper.Map<GetOfferDto>(offerFromDb);
            GetPhotosPaths(mappedOffer);
            response.Value = mappedOffer;
            return response;
        }

        public async Task<ResponseDto<int>> AddOffer(ClaimsPrincipal user, AddOfferDto offer)
        {
            var offerToDb = Mapper.Map<Offer>(offer);
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var categoryFromDb = await _categoriesRepository.GetCategoryById(offer.CategoryId);
            var offerTypeFromDb = await _offerTypesRepository.GetOfferTypeById(offer.OfferTypeId);

            ResponseDto<int> response = OffersValidator.ValidateAddOffer(userFromDb, categoryFromDb, offerTypeFromDb);
            if (response.HasErrors)
            {
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
            var offerFromDb = await _offersRepository.GetOfferById(id);
            ResponseDto<bool> response = OffersValidator.ValidateChangeOfferActivity(offerFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            var result = await _offersRepository.ChangeOfferActivity(offerFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteOffer(ClaimsPrincipal userIdentity, int id)
        {
            var offerFromDb = await _offersRepository.GetOfferById(id);
            ResponseDto<bool> response = OffersValidator.ValidateDeleteOffer(offerFromDb, userIdentity);
            if (response.HasErrors)
            {
                return response;
            }

            var result = await _offersRepository.DeleteOffer(offerFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferDto>>> GetOffersAdvancedSearch(SearchParameters searchParameters)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            List<SqlParameter> sqlParameters = new List<SqlParameter>();
            var query = "SELECT * FROM Offers WHERE Active = 1";
            if (!string.IsNullOrWhiteSpace(searchParameters.Title))
            {
                query += " AND LOWER(Title) LIKE '%'+@title+'%'";
                sqlParameters.Add(new SqlParameter("@title",searchParameters.Title));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PriceMin))
            {
                query += " AND CAST(Price as DECIMAL(18,2)) >= @priceMin";
                sqlParameters.Add(new SqlParameter("@priceMin", double.Parse(searchParameters.PriceMin, CultureInfo.InvariantCulture).ToString().Replace(',', '.')));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PriceMax))
            {
                query += " AND CAST(Price as DECIMAL(18,2)) <= @priceMax";
                sqlParameters.Add(new SqlParameter("@priceMax", double.Parse(searchParameters.PriceMax, CultureInfo.InvariantCulture).ToString().Replace(',', '.')));
            }

            if (searchParameters.AreaMin.HasValue)
            {
                query += " AND Area >= @areaMin";
                sqlParameters.Add(new SqlParameter("@areaMin", searchParameters.AreaMin));
            }

            if (searchParameters.AreaMax.HasValue)
            {
                query += " AND Area <= @areaMax";
                sqlParameters.Add(new SqlParameter("@areaMax", searchParameters.AreaMax));
            }

            if (searchParameters.Level.HasValue)
            {
                query += " AND Level = @level";
                sqlParameters.Add(new SqlParameter("@level",searchParameters.Level));
            }

            if (searchParameters.RoomCount.HasValue)
            {
                query += " AND RoomCount = @roomCount";
                sqlParameters.Add(new SqlParameter("@roomCount", searchParameters.RoomCount));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.City))
            {
                query += " AND LOWER(City) = @city";
                sqlParameters.Add(new SqlParameter("@city", searchParameters.City));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.CategoryId))
            {
                query += " AND CategoryId = @categoryId";
                sqlParameters.Add(new SqlParameter("@categoryId", searchParameters.CategoryId));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.OfferTypeId))
            {
                query += " AND OfferTypeId = @offerTypeId";
                sqlParameters.Add(new SqlParameter("@offerTypeId", searchParameters.OfferTypeId));
            }

            query += " ORDER BY Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";
            sqlParameters.Add(new SqlParameter("@offset", searchParameters.Limit * (searchParameters.Page - 1)));
            sqlParameters.Add(new SqlParameter("@limit", searchParameters.Limit));
            var offersToMap = await _offersRepository.GetOffersByQuery(query, sqlParameters);
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
            var userFromDb = await _usersRepository.GetUserByLogin(userLogin);
            var offersFromDb = await _offersRepository.GetOffersByUser(userFromDb);

            ResponseDto<List<GetOfferDto>> response = OffersValidator.ValidateGetOffersByUser(userFromDb, offersFromDb);
            if (response.HasErrors)
            {
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
            var offerToDb = Mapper.Map<Offer>(offer);
            var offerFromDb = await _offersRepository.GetOfferById(offer.Id);
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var categoryFromDb = await _categoriesRepository.GetCategoryById(offer.CategoryId);
            var offerTypeFromDb = await _offerTypesRepository.GetOfferTypeById(offer.OfferTypeId);

            var response = OffersValidator.ValidateUpdateOffer(offerFromDb, userFromDb, categoryFromDb, offerTypeFromDb);
            if (response.HasErrors)
            {
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
