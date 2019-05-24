namespace Rentall.Commons.ErrorMessages
{
    public static class MessageErrors//TODO readonly -> const
    {
        public static readonly string EmptyMessage = "Wiadomość musi mieć treść.";
        public static readonly string EmptyInbox = "Brak wiadomości";
        public static readonly string EmptyConversation = "Brak wiadomości w konwersacji.";
        public static readonly string MessageToSelf = "Nie można wysłać wiadomości do siebie";
    }
}
