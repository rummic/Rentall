using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rentall.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.MessageDto;
    using Rentall.Services.ModelServices.MessageService;

    using Swashbuckle.AspNetCore.Swagger;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IMessagesService _messagesService;
        public MessagesController(IMessagesService messagesService)
        {
            _messagesService = messagesService;
        }

        [HttpPost]
        public async Task<ActionResult<ResponseDto<int>>> AddMessage([FromBody] AddMessageDto messageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _messagesService.AddMessage(messageDto, User);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDto<List<GetMessagesDto>>>> GetMessageInbox()
        {
            ResponseDto<List<GetMessagesDto>> response = await _messagesService.GetMessageInbox(User);
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
