namespace Rentall.Commons.Helpers
{
    using System.Security.Cryptography;

    public static class SaltCreator
    {
        public static byte[] CreateSalt()
        {
            var size = 30;
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);
            return buff;
        }
    }
}
