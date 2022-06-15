using API.Controllers.Base;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers.Images
{
    public class ImageController : BaseApiController
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> UploadImage(IFormFile file)
        {
            if(file == null)
            {
                return BadRequest();
            }
            var imageLink = await _imageService.UploadImage(file);
            if (string.IsNullOrEmpty(imageLink))
            {
                return BadRequest();
            }

            return Ok(imageLink);
        }
    }
}
