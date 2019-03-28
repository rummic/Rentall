using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Rentall.DAL.Model
{
    public class Message
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string MessageText { get; set; }
        public DateTime SendDate { get; set; }
        
        public User Sender { get; set; }
        public User Recipient { get; set; }

    }
}
