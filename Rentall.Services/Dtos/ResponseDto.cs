namespace Rentall.Services.Dtos
{
    using System.Collections.Generic;
    using System.Linq;

    public class ResponseDto<T>
    {
        public ResponseDto()
        {
            Errors = new List<string>();
        }

        public T Value { get; set; }

        public bool HasErrors => Errors != null && Errors.Any();
        public List<string> Errors { get; set; }
        public void AddError(string error)
        {
            Errors.Add(error);
        }

        public void AddErrors(List<string> errors)
        {
            Errors.AddRange(errors);
        }
    }
}
