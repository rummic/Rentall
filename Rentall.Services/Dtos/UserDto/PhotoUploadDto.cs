namespace Rentall.Services.Dtos.UserDto
{
    using Microsoft.AspNetCore.Http;

    public class PhotoUploadDto
    {
        public string SourcePath { get; set; }
        public string Extension { get; set; }
        public int OfferId { get; set; }
    }
}
