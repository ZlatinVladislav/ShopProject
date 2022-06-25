using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace Infrastructure.Services
{
    public class ImageService : IImageService
    {
        private readonly IConfiguration _config;

        public ImageService(
            IConfiguration config
          )
        {
            _config = config;
        }

        public async Task<string> UploadImage(IFormFile file)
        {
            string fileName = string.Empty;
            string path = string.Empty;
            if (file.Length > 0)
            {
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), _config["ImagesPath"]));
                string fullPath = Path.Combine(path, fileName);

                using (var image = Image.Load(file.OpenReadStream()))
                {
                    string newSize = ResizeImage(image, 1200, 1200);
                    string[] aSize = newSize.Split(',');

                    image.Mutate(h => h.Resize(Convert.ToInt32(aSize[1]), Convert.ToInt32(aSize[0])));
                    image.Save(fullPath);
                }
            }

            return fileName;
        }

        public string ResizeImage(Image img, int maxWidth, int maxHeight)
        {
            if (img.Width > maxWidth || img.Height > maxHeight)
            {
                double widthRatio = (double)img.Width / (double)img.Height;
                double heightRatio = (double)img.Height / (double)img.Width;
                double ratio = widthRatio / heightRatio;
                int newWitdth = (int)(img.Width / ratio);
                int newHeight = (int)(img.Height / ratio);

                return newHeight.ToString() + "," + newWitdth.ToString();
            }
            else
            {
                return img.Height.ToString() + "," + img.Width.ToString();
            }
        }
    }
}
