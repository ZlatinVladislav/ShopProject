using API.Dtos;
using API.Helpers.Resolver;
using API.ViewModels;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDetailsViewModel>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<ProductViewModel, Product>();
            CreateMap<ProductBrand, ProductBrandViewModel>().ReverseMap();
            CreateMap<ProductTypeViewModel, ProductType>().ReverseMap();
            CreateMap<DeliveryMethodViewModel, DeliveryMethod>().ReverseMap();

            CreateMap<Core.Entities.Identity.Address, AddressViewModel>().ReverseMap();
            CreateMap<CustomerBasketViewModel, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemViewModel, BasketItem>().ReverseMap();

            CreateMap<AddressViewModel, Core.Entities.OrderAggregate.Address>();

            CreateMap<Order, OrderDetailsViewModal>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));


            CreateMap<OrderItem, OrderItemViewModel>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}