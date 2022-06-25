using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class ProductViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public IFormFile PictureForm { get; set; }
        public int ProductTypeId { get; set; }
        public int ProductBrandId { get; set; }
    }
}
