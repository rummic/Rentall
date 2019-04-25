namespace Rentall.DAL.Model
{
    using System.ComponentModel.DataAnnotations;

    public class Photo
    {
        [Key]
        public string Path { get; set; }
        public bool Active { get; set; }
        public bool IsMain { get; set; }
        public Offer Offer { get; set; }
    }
}
