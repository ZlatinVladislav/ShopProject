using System.Threading.Tasks;
using API.Controllers.Base;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Redis
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasketViewModel>> GetBasketById(string id)
        {
            var basket = _mapper.Map<CustomerBasketViewModel>(await _basketRepository.GetBasketAsync(id));

            if (basket == null)
            {
                basket = _mapper.Map<CustomerBasketViewModel>(new CustomerBasket(id));
            }

            return Ok(basket);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasketViewModel>> UpdateBasket(CustomerBasketViewModel basket)
        {
            var customerBasket = _mapper.Map<CustomerBasketViewModel, CustomerBasket>(basket);

            var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}