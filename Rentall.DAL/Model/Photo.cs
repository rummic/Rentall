using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Rentall.DAL.Model
{
    public class Photo
    {
        public Offer Offer { get; set; }
        [Key]
        public string Path { get; set; }
    }
}
