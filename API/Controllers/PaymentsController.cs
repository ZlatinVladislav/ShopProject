using API.Controllers.Base;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly string _whSecret;
        private readonly IMapper _mapper;

        public PaymentsController(
            IPaymentService paymentService,
            IMapper mapper,
            IConfiguration config)
        {
            _paymentService = paymentService;
            _whSecret = config.GetSection("StripeSettings:WhSecret").Value;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasketViewModel>> CreateOrUpdatePaymentIntent(string basketID)
        {
            return _mapper.Map<CustomerBasketViewModel>(await _paymentService.CreateOrUpdatePaymentIntent(basketID));
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);

            await _paymentService.CheckEventStripeStatus(stripeEvent);

            return new EmptyResult();
        }
    }
}
