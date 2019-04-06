namespace Rentall.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.ModelServices.CategoryService;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<ResponseDto<List<Category>>>> GetCategories()
        {
            var categoriesResponse = await _categoriesService.GetCategories();
            if (categoriesResponse.HasErrors)
            {
                return BadRequest(categoriesResponse);
            }

            return Ok(categoriesResponse);
        }
    }
}
