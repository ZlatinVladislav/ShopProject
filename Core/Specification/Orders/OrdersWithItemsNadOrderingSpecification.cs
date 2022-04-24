using Core.Entities.OrderAggregate;
using Core.Specifications.Base;

namespace Core.Specification
{
    public class OrdersWithItemsNadOrderingSpecification : BaseSpecifcation<Order>
    {
        public OrdersWithItemsNadOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsNadOrderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
