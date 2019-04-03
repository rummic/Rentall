using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Rentall.Services.Dtos.UserDto
{
    public class PhotoUploadDto
    {
        public IFormFile File { get; set; }
        public string SourcePath { get; set; }
        public long Size { get; set; }
        public string Extension { get; set; }
    }
}
