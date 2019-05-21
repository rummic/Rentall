namespace Rentall.Services.Validators
{
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Security.Claims;

    using Rentall.Commons.Enumerables;
    using Rentall.Commons.ErrorMessages;
    using Rentall.Commons.ExtensionMethods;
    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.UserDto;

    public static class UsersValidator
    {
        public static ResponseDto<GetUserByIdDto> ValidateGetUserById(User user)
        {
            var response = new ResponseDto<GetUserByIdDto>();
            if (user == null)
            {
                response.AddError(UserErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<int> ValidateAddUser(AddUserDto userToAdd, User user)
        {
            var response = ValidateUserForm(userToAdd);
            if (user != null)
                response.AddError(UserErrors.LoginTaken);

            return response;
        }



        public static ResponseDto<int> ValidateUpdateUser(ClaimsPrincipal loggedInUser, AddUserDto userToUpdate, User userFromDb)
        {
            var response = ValidateUserForm(userToUpdate);
            if (userFromDb == null)
                response.AddError(UserErrors.NotFoundByLogin);
            if (loggedInUser.Identity.Name != userToUpdate.Login && !loggedInUser.IsInRole(Role.Admin) && !loggedInUser.IsInRole(Role.SuperAdmin))
                response.AddError(UserErrors.NotAllowed);

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteUser(ClaimsPrincipal userIdentity, User userFromDb)
        {
            var response = new ResponseDto<bool>();
            if (userFromDb == null || userFromDb.IsDeleted)
            {
                response.AddError(UserErrors.NotFoundById);
                return response;
            }

            if (userIdentity.IsInRole("User") && userIdentity.Identity.Name != userFromDb.Login)
                response.AddError(UserErrors.CannotDeleteUser);

            return response;
        }

        public static ResponseDto<LoggedInUserDto> ValidateAuthenticate(User user, LoginUserDto loginUser)
        {
            var response = new ResponseDto<LoggedInUserDto>();

            if (user == null)
            {
                response.Errors.Add(UserErrors.NotFoundByLogin);
                return response;
            }

            if (!user.Password.IsEqualTo(loginUser.Password.GenerateSaltedHash(user.Salt)))
                response.Errors.Add(UserErrors.InvalidPassword);

            return response;


        }

        private static ResponseDto<int> ValidateUserForm(AddUserDto userToAdd)
        {
            var response = new ResponseDto<int>();
            if (string.IsNullOrEmpty(userToAdd.Login))
                response.AddError(UserErrors.EmptyLogin);
            if (string.IsNullOrEmpty(userToAdd.Email))
                response.AddError(UserErrors.EmptyEmail);
            if (string.IsNullOrEmpty(userToAdd.FirstName))
                response.AddError(UserErrors.EmptyFirstName);
            if (string.IsNullOrEmpty(userToAdd.LastName))
                response.AddError(UserErrors.EmptyLastName);
            if (string.IsNullOrEmpty(userToAdd.PhoneNumber))
                response.AddError(UserErrors.EmptyPhoneNumber);
            if (!userToAdd.Login.All(char.IsLetterOrDigit))
                response.AddError(UserErrors.LoginInvalidChars);
            if (!new EmailAddressAttribute().IsValid(userToAdd.Email))
                response.AddError(UserErrors.EmailInvalid);
            return response;
        }
    }
}
