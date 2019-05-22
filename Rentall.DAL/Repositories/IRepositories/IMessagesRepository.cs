using System.Collections.Generic;

namespace Rentall.DAL.Repositories.IRepositories
{
    using Rentall.DAL.Model;
    using System.Threading.Tasks;

    public interface IMessagesRepository
    {
        Task<int> AddMessage(Message message);
        Task<IEnumerable<Message>> GetMessagesInbox(User recipient);
        Task<IEnumerable<Message>> GetConversation(User recipient, User sender);
    }
}
