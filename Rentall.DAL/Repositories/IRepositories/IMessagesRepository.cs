namespace Rentall.DAL.Repositories.IRepositories
{
    using Rentall.DAL.Model;
    using System.Threading.Tasks;

    public interface IMessagesRepository
    {
        Task<int> AddMessage(Message message);
    }
}
