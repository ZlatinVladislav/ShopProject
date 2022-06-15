using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IProductService
    {
        Task<Product> CreateProduct(Product product, IFormFile pictureForm);
    }
}
