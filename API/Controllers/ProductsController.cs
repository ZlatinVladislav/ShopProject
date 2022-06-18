using API.Controllers.Base;
using API.Dtos;
using API.Errors;
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
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var products = await _productsService.GetProducts(productParams);
            var totalItems = await _productsService.GetNumerOfProducts(productParams);
            var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,
                productParams.PageSize, totalItems, data));
        }

        [Cached(500)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            return _mapper.Map<ProductToReturnDto>(await _productsService.GetProduct(id));
        }

        [Cached(500)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _productsService.GetBrands());
        }

        [Cached(500)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes()
        {
            return Ok(await _productsService.GetTypes());
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProductToReturnDto>> CreateProduct([FromForm] ProductDto productDto)
        {
            var product = _mapper.Map<ProductDto, Product>(productDto);

            return Ok(await _productsService.CreateProduct(product, productDto.PictureForm));
        }
    }
}