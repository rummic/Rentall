using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.Commons.Helpers
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;

    public static class MailHelper
    {
        public static async Task ResetPasswordMail(AppSettings appSettings, string recipient, string newPassword)
        {
            var mail = new MailMessage(new MailAddress(appSettings.AppMail), new MailAddress(recipient));
            var smtp = new SmtpClient(appSettings.MailHost);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(appSettings.AppMail, appSettings.MailPassword);
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

            mail.Subject = "Reset Hasła - Rentall";
            mail.Body =
                $"Hasło twojego konta zostało zrestartowane, oto nowe hasło: {newPassword}";
            await smtp.SendMailAsync(mail);
        }
    }
}
