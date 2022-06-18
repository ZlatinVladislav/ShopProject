using API.Extenions.Exception;
using AutoMapper;
using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Interfaces.Base;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IImageService _imageService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;

        public ProductService(

            IImageService imageService,
            IUnitOfWork unitOfWork,
            IConfiguration config
          )
        {
            _imageService = imageService;
            _unitOfWork = unitOfWork;
            _config = config;
        }

        public async Task<IReadOnlyList<Product>> GetProducts(ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            return await _unitOfWork.Repository<Product>().ListAsync(spec);
        }

        public async Task<int> GetNumerOfProducts(ProductSpecParams productParams)
        {
            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);
            return await _unitOfWork.Repository<Product>().CountAsync(countSpec);
        }

        public async Task<IReadOnlyList<ProductBrand>> GetBrands()
        {
            return await _unitOfWork.Repository<ProductBrand>().ListAllAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetTypes()
        {
            return await _unitOfWork.Repository<ProductType>().ListAllAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (product == null)
            {
                throw new NotFoundException(EntityEnum.Product.ToString());
            };

            return product;
        }

        public async Task<Product> CreateProduct(Product product, IFormFile pictureForm)
        {
            var filename = await _imageService.UploadImage(pictureForm);
            product.PictureUrl = _config["ImagesPathWithoutContent"] + filename;
            _unitOfWork.Repository<Product>().Add(product);

            await _unitOfWork.Repository<Product>().SaveAsync();
            return product;
        }
    }
}
