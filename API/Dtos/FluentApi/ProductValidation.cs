using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Dtos.FluentApi
{
    public class ProductValidation : IEntityTypeConfiguration<ProductDto>
    {
        public void Configure(EntityTypeBuilder<ProductDto> builder)
        {
            builder.Property(o => o.Name).IsRequired();
            builder.Property(o => o.Description).IsRequired();
            builder.Property(o => o.Price).IsRequired();
            builder.Property(o => o.ProductTypeId).IsRequired();
            builder.Property(o => o.ProductBrandId).IsRequired();
        }
    }
}