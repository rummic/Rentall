using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Rentall.DAL.Model;
using Rentall.Services.Dtos;

namespace Rentall.Services.UserService
{
    public interface IOfferTypesService
    {
        Task<ResponseDto<List<OfferType>>> GetOfferTypes();
    }
}
