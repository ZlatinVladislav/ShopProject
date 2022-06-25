namespace API.Dtos
{
    public class OrderViewModel
    {
        public string BasketId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressViewModel ShipToAddress { get; set; }
    }
}
