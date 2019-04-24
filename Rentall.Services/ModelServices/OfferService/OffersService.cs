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
            catch (Exception e)
            {
                response.AddError(OfferErrors.AddingError);
                Console.Error.WriteLine(e); // TODO proper logging 
            }

            return response;
        }

        public async Task<ResponseDto<bool>> ChangeOfferActivity(int id)
        {
            var response = new ResponseDto<bool>();
            var offerFromDb = await _offersRepository.GetOfferById(id);
            if (offerFromDb != null)
            {
                var result = await _offersRepository.ChangeOfferActivity(id);
                response.Value = result;
                return response;
            }
            response.AddError(OfferErrors.NotFoundById);
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
                response.AddError(OfferErrors.CannotDeleteOffer);
                return response;
            }

            var result = await _offersRepository.DeleteOffer(offerFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferByIdDto>>> GetRandomOffers(int count)
        {
            var response = new ResponseDto<List<GetOfferByIdDto>>();
            var offersFromDb = await _offersRepository.GetOffers();
            var randomOffers = offersFromDb.OrderBy(x => Guid.NewGuid()).Take(count).ToList();
            
            var mappedRandomOffers = Mapper.Map<List<GetOfferByIdDto>>(randomOffers);
            foreach (var mappedOffer in mappedRandomOffers)
            {
                for (int i = 0; i < mappedOffer.Photos.Count; i++)
                {
                    var split = mappedOffer.Photos[i].Split('\\');
                    mappedOffer.Photos[i] = string.Join('/', split.Skip(split.Length - 2));
                }
            }
            response.Value = mappedRandomOffers;
            return response;
        }

        public async Task<ResponseDto<List<GetOfferByIdDto>>> GetOffersByQuery(string query)
        {
            var response = new ResponseDto<List<GetOfferByIdDto>>();
            var querySplit = query.Split(" ");
            var offersFromDb = await _offersRepository.GetOffers();
            var offersToMap = offersFromDb.Where(x => querySplit.All(y => x.ToString().Contains(y.ToLowerInvariant())));
            if (!offersToMap.Any())
            {
                response.AddError(OfferErrors.NotFoundByQuery);
                return response;
            }
            var mappedOffers = Mapper.Map<List<GetOfferByIdDto>>(offersToMap);
            foreach (var mappedOffer in mappedOffers)
            {
                for (int i = 0; i < mappedOffer.Photos.Count; i++)
                {
                    var split = mappedOffer.Photos[i].Split('\\');
                    mappedOffer.Photos[i] = string.Join('/', split.Skip(split.Length - 2));
                }
            }
            response.Value = mappedOffers;
            return response;
        }


        public async Task<ResponseDto<List<GetOfferByIdDto>>> GetOffersByUser(string userLogin)
        {
            var response = new ResponseDto<List<GetOfferByIdDto>>();
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

            var mappedOffers = Mapper.Map<List<GetOfferByIdDto>>(offersFromDb);
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
            catch (Exception e)
            {
                response.AddError(OfferErrors.AddingError);
                Console.Error.WriteLine(e); // TODO proper logging 
            }

            return response;
        }

        private static void GetPhotosPaths(GetOfferByIdDto mappedOffer)
        {
            for (int i = 0; i < mappedOffer.Photos.Count; i++)
            {
                var split = mappedOffer.Photos[i].Split('\\');
                mappedOffer.Photos[i] = string.Join('/', split.Skip(split.Length - 2));
            }
        }
    }
}
