using Core.Entities;
using Core.Specifications;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyList<Product>> GetProducts(ProductSpecParams productParams);
        Task<int> GetNumerOfProducts(ProductSpecParams productParams);
        Task<IReadOnlyList<ProductBrand>> GetBrands();
        Task<IReadOnlyList<ProductType>> GetTypes();
        Task<Product> GetProduct(int id);
        Task<Product> CreateProduct(Product product, IFormFile pictureForm);
    }
}
