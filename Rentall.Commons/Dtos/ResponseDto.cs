using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rentall.Commons.Dtos
{
    public class ResponseDto<T>
    {
        public ResponseDto()
        {
            Errors = new List<string>();
        }

        public ResponseDto(T value)
        {
            Value = value;
        }

        public void AddError(string error)
        {
            Errors.Add(error);
        }

        public void AddErrors(List<string> errors)
        {
            Errors.AddRange(errors);
        }
        public T Value { get; set; }
        public bool HasErrors => Errors != null && Errors.Any();
        public List<string> Errors { get; set; }
    }
}
