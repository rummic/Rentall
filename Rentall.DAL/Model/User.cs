namespace Rentall.DAL.Model
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] Password { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsDeleted { get; set; }
        public string Role { get; set; }
        public byte[] Salt { get; set; }

        // public List<Message> SentMessages { get; set; }
        // public List<Message> ReceivedMessages { get; set; }
        // public List<Offer> CreatedOffers { get; set; }
    }
}
