namespace Rentall.Services.ModelServices.MessageService
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.MessageDto;
    using Rentall.Services.Validators;

    public class MessagesService : IMessagesService
    {
        private readonly IMessagesRepository _messagesRepository;
        private readonly IUsersRepository _usersRepository;

        public MessagesService(IMessagesRepository messagesRepository, IUsersRepository usersRepository)
        {
            _messagesRepository = messagesRepository;
            _usersRepository = usersRepository;
        }

        public async Task<ResponseDto<int>> AddMessage(AddMessageDto messageDto, ClaimsPrincipal user)
        {
            var recipient = await _usersRepository.GetUserByLogin(messageDto.RecipientLogin);
            var sender = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var response = MessagesValidator.ValidateAddMessage(messageDto, recipient, user);
            if (response.HasErrors)
                return response;

            Message message = Mapper.Map<AddMessageDto, Message>(messageDto);
            message.SendDate = DateTime.UtcNow;
            message.Sender = sender;
            message.Recipient = recipient;
            response.Value = await _messagesRepository.AddMessage(message);
            return response;
        }

        public async Task<ResponseDto<List<GetMessagesDto>>> GetMessageInbox(ClaimsPrincipal user)
        {
            var recipient = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var response = MessagesValidator.ValidateGetMessageInbox(recipient);
            if (response.HasErrors)
                return response;

            var messagesFromDb = await _messagesRepository.GetMessagesInbox(recipient);
            if (!messagesFromDb.Any())
            {
                response.AddError(MessageErrors.EmptyInbox);
            }
            List<GetMessagesDto> mappedMessages = Mapper.Map<List<GetMessagesDto>>(messagesFromDb);
            response.Value = mappedMessages;
            return response;
        }

        public async Task<ResponseDto<List<GetMessagesDto>>> GetConversation(ClaimsPrincipal user, string senderLogin)
        {
            var recipient = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var sender = await _usersRepository.GetUserByLogin(senderLogin);
            var response = MessagesValidator.ValidateGetConversation(recipient, sender);
            if (response.HasErrors)
                return response;

            var messagesFromDb = await _messagesRepository.GetConversation(recipient, sender);
            if (!messagesFromDb.Any())
            {
                response.AddError(MessageErrors.EmptyConversation);
            }
            List<GetMessagesDto> mappedMessages = Mapper.Map<List<GetMessagesDto>>(messagesFromDb);
            response.Value = mappedMessages;
            return response;
        }
    }
}
