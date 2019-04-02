using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.OfferDto;
using Rentall.Commons.ErrorMessages;
using Rentall.DAL.Repositories.IRepositories;

namespace Rentall.Services.UserService
{
    public class OffersService : IOffersService
    {
        private IOffersRepository _offersRepository;
        private IUsersRepository _usersRepository;

        public OffersService(IOffersRepository offersRepository, IUsersRepository usersRepository)
        {
            _offersRepository = offersRepository;
            _usersRepository = usersRepository;
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

            //offerFromDb.User = await _usersRepository.GetUserById(offerFromDb.User.Id)
            var mappedOffer = Mapper.Map<GetOfferByIdDto>(offerFromDb);
            response.Value = mappedOffer;
            return response;
        }
    }
}
