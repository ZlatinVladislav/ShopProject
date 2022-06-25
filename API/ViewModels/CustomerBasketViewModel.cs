using Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CustomerBasketViewModel
    {
        [Required]
        public string Id { get; set; }
        public IReadOnlyList<BasketItemViewModel> Items { get; set; }
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
    }
}
