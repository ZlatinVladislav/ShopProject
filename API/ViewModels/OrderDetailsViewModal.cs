using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class OrderDetailsViewModal
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemViewModel> OrderItems { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
    }
}
