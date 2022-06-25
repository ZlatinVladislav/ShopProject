using Core.Entities.OrderAggregate;
using Core.Specifications.Base;

namespace Core.Specification
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecifcation<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }
    }
}
