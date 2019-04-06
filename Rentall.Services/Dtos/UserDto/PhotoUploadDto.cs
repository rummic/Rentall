namespace Rentall.Services.Dtos.UserDto
{
    using Microsoft.AspNetCore.Http;

    public class PhotoUploadDto
    {
        public IFormFile File { get; set; }
        public string SourcePath { get; set; }
        public long Size { get; set; }
        public string Extension { get; set; }
        public int OfferId { get; set; }
    }
}
