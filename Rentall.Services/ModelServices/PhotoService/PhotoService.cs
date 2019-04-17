﻿namespace Rentall.Services.ModelServices.PhotoService
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    public class PhotoService : IPhotoService
    {
        private readonly IOffersRepository _offersRepository;

        private readonly IPhotosRepository _photosRepository;

        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly List<string> _allowedExtensions = new List<string> { ".jpeg", ".jpg", ".png" };

        private readonly string _photosFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Photos");
        public PhotoService(IHostingEnvironment hostingEnvironment, IOffersRepository offersRepository, IPhotosRepository photosRepository)
        {
            _hostingEnvironment = hostingEnvironment;
            _offersRepository = offersRepository;
            _photosRepository = photosRepository;
            if (string.IsNullOrWhiteSpace(_hostingEnvironment.WebRootPath))
            {
                _hostingEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            if (!Directory.Exists(_hostingEnvironment.WebRootPath) || !Directory.Exists(_photosFolderPath))
            {
                Directory.CreateDirectory(_photosFolderPath);
            }
        }

        public async Task<ResponseDto<string>> AddPhoto(IFormFile photo, int offerId, bool mainPhoto)
        {
            var result = new ResponseDto<string>();
            if (photo.Length <= 0)
            {
                result.AddError(PhotoErrors.EmptyFile);
                return result;
            }

            if (_allowedExtensions.All(x => x != Path.GetExtension(photo.FileName)))
            {
                result.AddError(PhotoErrors.WrongExtension);
                return result;
            }

            Offer offerFromDb = await _offersRepository.GetOfferById(offerId);
            if (offerFromDb == null)
            {
                result.AddError(OfferErrors.NotFoundById);
                return result;
            }

            if (mainPhoto && offerFromDb.Photos.Any(x => x.IsMain))
            {
                result.AddError(OfferErrors.OneMainPhoto);
                return result;
            }
            string filePath = GetAvailablePath(_photosFolderPath, photo.FileName);
            Photo photoToAdd =
                new Photo
                {
                    Path = filePath,
                    Active = true,
                    Offer = offerFromDb,
                    IsMain = mainPhoto
                };

            try
            {
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(fs);
                }
            }
            catch (Exception e)
            {
                result.AddError(PhotoErrors.CannotSave);
                return result;
            }

            try
            {
                await _photosRepository.AddPhoto(photoToAdd);
                var split = filePath.Split('\\');
                result.Value = string.Join('/', split.Skip(split.Length - 2));
                return result;
            }
            catch (Exception e)
            {
                File.Delete(filePath);
                result.AddError(PhotoErrors.InfoSaveFailed);
                return result;
            }
        }

        private string GetAvailablePath(string photosFolderPath, string photoFileName)
        {
            return Path.Combine(
                photosFolderPath,
                DateTime.UtcNow.ToString("HH-mm-ss-fff_dd-MM-yyyy_") + photoFileName);
        }
    }
}
