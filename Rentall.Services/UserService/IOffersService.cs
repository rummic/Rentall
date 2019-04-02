using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Rentall.Commons.Dtos;
using Rentall.Commons.Dtos.OfferDto;

namespace Rentall.Services.UserService
{
    public interface IOffersService
    {
        Task<ResponseDto<GetOfferByIdDto>> GetOfferById(int id);
    }
}
