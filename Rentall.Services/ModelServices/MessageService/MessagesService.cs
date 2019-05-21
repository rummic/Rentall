namespace Rentall.Services.ModelServices.MessageService
{
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

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
            var response = MessagesValidator.ValidateAddMessage(messageDto, recipient);
            if (response.HasErrors)
                return response;

            Message message = Mapper.Map<AddMessageDto, Message>(messageDto);
            message.SendDate = DateTime.UtcNow;
            message.Sender = sender;
            message.Recipient = recipient;
            response.Value = await _messagesRepository.AddMessage(message);
            return response;
        }
    }
}
