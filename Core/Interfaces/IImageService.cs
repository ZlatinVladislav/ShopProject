using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IImageService
    {
        Task<string> UploadImage(IFormFile file);
    }
}
