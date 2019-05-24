namespace Rentall.Services.ModelServices.MessageService
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.MessageDto;

    public interface IMessagesService
    {
        Task<ResponseDto<int>> AddMessage(AddMessageDto messageDto, ClaimsPrincipal user);
        Task<ResponseDto<List<GetMessagesDto>>> GetMessageInbox(ClaimsPrincipal user);
        Task<ResponseDto<List<GetMessagesDto>>> GetConversation(ClaimsPrincipal user, string senderLogin);
    }
}
