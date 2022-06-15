using Core.Entities;
using Core.Entities.OrderAggregate;
using Stripe;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        //Task<Order> UpdateOrderPaymentSecceeded(string paymentIntentId);
        //Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
        Task CheckEventStripeStatus(Event stripeEvent);
    }
}
