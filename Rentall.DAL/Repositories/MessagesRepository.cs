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
            var messages = await _context.Messages.Where(x => x.Recipient == recipient)
                .Include(x => x.Sender)
                .OrderByDescending(x => x.SendDate)
                .GroupBy(x => x.Sender)
                .Select(x => x.FirstOrDefault()).ToListAsync();
            return messages;
        }
    }
}
