namespace Rentall.Services.Dtos
{
    public class SearchParameters
    {
        public string Title { get; set; }
        public string PriceMin { get; set; }
        public string PriceMax { get; set; }
        public int? AreaMin { get; set; }
        public int? AreaMax { get; set; }
        public int? Level { get; set; }
        public int? RoomCount { get; set; }
        public string City { get; set; }
        public string CategoryId { get; set; }
        public string OfferTypeId { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
    }
}
