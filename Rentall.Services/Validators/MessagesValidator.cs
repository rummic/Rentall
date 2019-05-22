using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.Services.Validators
{
    using System.Security.Claims;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.MessageDto;

    public static class MessagesValidator
    {
        public static ResponseDto<int> ValidateAddMessage(AddMessageDto message, User recipient)
        {
            var response = new ResponseDto<int>();
            if (string.IsNullOrWhiteSpace(message.MessageText))
                response.AddError(MessageErrors.EmptyMessage);
            if (recipient == null)
                response.AddError(UserErrors.NotFoundByLogin);

            return response;
        }

        public static ResponseDto<List<GetMessagesDto>> ValidateGetMessageInbox(User recipient)
        {
            var response = new ResponseDto<List<GetMessagesDto>>();
            if(recipient == null)
                response.AddError(UserErrors.NotFoundByLogin);

            return response;
        }
    }
}
