using API.Controllers.Base;
using API.Dtos;
using API.Errors;
using API.ViewModels;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Interfaces.Base;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IProductService _productsService;
        private readonly IMapper _mapper;

        public ProductsController(
            IProductService productService,
            IMapper mapper)
        {
            _mapper = mapper;
            _productsService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDetailsViewModel>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var products = await _productsService.GetProducts(productParams);
            var totalItems = await _productsService.GetNumerOfProducts(productParams);
            var data = _mapper.Map<IReadOnlyList<ProductDetailsViewModel>>(products);

            return Ok(new Pagination<ProductDetailsViewModel>(productParams.PageIndex,
                productParams.PageSize, totalItems, data));
        }

        [Cached(500)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDetailsViewModel>> GetProduct(int id)
        {
            return _mapper.Map<ProductDetailsViewModel>(await _productsService.GetProduct(id));
        }

        [Cached(500)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrandViewModel>>> GetBrands()
        {
            var ss = await _productsService.GetBrands();
            return Ok(_mapper.Map<IReadOnlyList<ProductBrandViewModel>>(ss));
        }

        [Cached(500)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductTypeViewModel>>> GetTypes()
        {
            return Ok(_mapper.Map<IReadOnlyList<ProductTypeViewModel>>(await _productsService.GetTypes()));
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProductDetailsViewModel>> CreateProduct([FromForm] ProductViewModel productDto)
        {
            var product = _mapper.Map<ProductViewModel, Product>(productDto);

            return Ok(await _productsService.CreateProduct(product, productDto.PictureForm));
        }
    }
}