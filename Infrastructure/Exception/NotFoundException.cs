using Core.Enums;

namespace API.Extenions.Exception
{
    public class NotFoundException : SystemException
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}
