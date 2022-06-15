using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Interfaces.Base;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IImageService _imageService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public ProductService(
            IImageService imageService,
            IUnitOfWork unitOfWork,
            IMapper mapper
          )
        {
            _imageService = imageService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<Product> CreateProduct(Product product, IFormFile pictureForm)
        {
            var filename = await _imageService.UploadImage(pictureForm);
            product.PictureUrl = filename;
            _unitOfWork.Repository<Product>().Add(product);

            await _unitOfWork.Complete();
            return product;
        }
    }
}
