using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.Services.Dtos.MessageDto
{
    public class GetMessagesDto
    {
        public string MessageText { get; set; }
        public string SenderLogin { get; set; }
        public DateTime SendDate { get; set; }
    }
}
