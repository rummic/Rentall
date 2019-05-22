using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Rentall.DAL.Repositories
{
    using Rentall.DAL.Config;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories.IRepositories;
    using System.Threading.Tasks;

    public class MessagesRepository : IMessagesRepository
    {
        private readonly ApplicationDbContext _context;

        public MessagesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddMessage(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message.Id;
        }

        public async Task<IEnumerable<Message>> GetMessagesInbox(User recipient)
        {
            var messagesReceived = await _context.Messages.Where(x => x.Recipient == recipient)
                .Include(x => x.Sender)
                .OrderByDescending(x => x.SendDate)
                .GroupBy(x => x.Sender)
                .Select(x => x.FirstOrDefault()).ToListAsync();
            var messagesSent = await _context.Messages.Where(x => x.Sender == recipient)
                .Include(x => x.Recipient)
                .OrderByDescending(x => x.SendDate)
                .GroupBy(x => x.Recipient)
                .Select(x => x.FirstOrDefault()).ToListAsync();
            for (int i = 0; i < messagesReceived.Count; i++)
            {
                for (int j = 0; j < messagesSent.Count; j++)
                {
                    if (messagesReceived[i].Sender != messagesSent[j].Recipient)
                        continue;

                    if (messagesReceived[i].SendDate > messagesSent[j].SendDate)
                        messagesSent.RemoveAt(j);
                    else
                    {
                        messagesReceived.RemoveAt(i);
                        break;
                    }
                }
            }
            var messages = messagesReceived.Union(messagesSent).OrderByDescending(x => x.SendDate);

            return messages;
        }

        public async Task<IEnumerable<Message>> GetConversation(User recipient, User sender)
        {
            var messagesReceived = await _context.Messages
                .Where(x => x.Recipient == recipient && x.Sender == sender)
                .ToListAsync();
            var messagesSent = await _context.Messages
                .Where(x => x.Recipient == sender && x.Sender == recipient)
                .ToListAsync();
            var messages = messagesReceived.Union(messagesSent).OrderBy(x => x.SendDate);
            return messages;
        }
    }
}
