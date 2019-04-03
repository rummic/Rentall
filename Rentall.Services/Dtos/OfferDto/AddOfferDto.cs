using System;

namespace Rentall.Services.Dtos.OfferDto
{
    public class AddOfferDto
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
        public bool Active { get; set; }
        public int CategoryId { get; set; }
        public int OfferTypeId { get; set; }
        public string UserLogin { get; set; }
    }
}
