using System;
using Rentall.Services.Dtos.UserDto;

namespace Rentall.Services.Dtos.OfferDto
{
    public class GetOfferByIdDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public int Area { get; set; }
        public string MapLink { get; set; }
        public int Level { get; set; }
        public int RoomCount { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public bool Status { get; set; }
        public DateTime CreateDate { get; set; }

        public string CategoryName { get; set; }
        public string OfferType { get; set; }
        public GetUserByIdDto User { get; set; }
    }
}
