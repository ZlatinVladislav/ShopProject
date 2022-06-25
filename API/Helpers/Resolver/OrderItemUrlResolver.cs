using API.Dtos;
using AutoMapper;
using Core.Entities.OrderAggregate;

namespace API.Helpers.Resolver
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemViewModel, string>
    {
        private readonly IConfiguration _config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, OrderItemViewModel destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _config["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }

            return null;
        }
    }
}
