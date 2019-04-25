namespace Rentall.Services.ModelServices.PhotoService
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.PhotoDto;

    public class PhotoService : IPhotoService
    {
        private readonly IOffersRepository _offersRepository;

        private readonly IPhotosRepository _photosRepository;

        private readonly List<string> _allowedExtensions = new List<string> { ".jpeg", ".jpg", ".png" };

        private readonly string _photosFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Photos");
        public PhotoService(IHostingEnvironment hostingEnvironment, IOffersRepository offersRepository, IPhotosRepository photosRepository)
        {
            _offersRepository = offersRepository;
            _photosRepository = photosRepository;
            if (string.IsNullOrWhiteSpace(hostingEnvironment.WebRootPath))
            {
                hostingEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            if (!Directory.Exists(hostingEnvironment.WebRootPath) || !Directory.Exists(_photosFolderPath))
            {
                Directory.CreateDirectory(_photosFolderPath);
            }
        }

        public async Task<ResponseDto<string>> AddPhoto(ClaimsPrincipal user, IFormFile photo, int offerId)
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

            if (user.Identity.Name != offerFromDb.User.Login)
            {
                result.AddError(UserErrors.NotAllowed);
                return result;
            }

            string filePath = GetAvailablePath(_photosFolderPath, photo.FileName);
            Photo photoToAdd =
                new Photo
                {
                    Path = filePath,
                    Active = true,
                    Offer = offerFromDb,
                };

            try
            {
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(fs);
                }
            }
            catch
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
            catch
            {
                File.Delete(filePath);
                result.AddError(PhotoErrors.InfoSaveFailed);
                return result;
            }
        }

        public async Task<ResponseDto<bool>> ChangePhotoActivity(string photoPath)
        {
            var response = new ResponseDto<bool>();
            var photoFromDb = await _photosRepository.GetPhotoByPath(photoPath);
            if (photoFromDb != null)
            {
                var result = await _photosRepository.ChangePhotoActivity(photoPath);
                response.Value = result;
                return response;
            }

            response.AddError(PhotoErrors.NotFoundByPath);
            return response;
        }

        public async Task<ResponseDto<GetPhotoByPathDto>> GetPhotoByPath(string photoPath)
        {
            var response = new ResponseDto<GetPhotoByPathDto>();
            var photoFromDb = await _photosRepository.GetPhotoByPath(photoPath);
            if (photoFromDb == null)
            {
                response.AddError(PhotoErrors.NotFoundByPath);
                return response;
            }

            var mappedPhoto = Mapper.Map<GetPhotoByPathDto>(photoFromDb);
            response.Value = mappedPhoto;
            return response;
        }

        private string GetAvailablePath(string photosFolderPath, string photoFileName)
        {
            return Path.Combine(
                photosFolderPath,
                DateTime.UtcNow.ToString("HH-mm-ss-fff_dd-MM-yyyy_") + photoFileName);
        }
    }
}
