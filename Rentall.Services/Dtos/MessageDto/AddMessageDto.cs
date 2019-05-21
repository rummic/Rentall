namespace Rentall.Services.Dtos.MessageDto
{
    using System;

    public class AddMessageDto
    {
        public string MessageText { get; set; }
        public string RecipientLogin { get; set; }
    }
}
