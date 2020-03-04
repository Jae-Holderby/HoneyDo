using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Persons;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PersonsController: ControllerBase
    {
        private readonly IMediator _mediator;
        public PersonsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<Person>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpPut("{phoneNumber}")]
        public async Task<ActionResult<Unit>> Edit(string phoneNumber, Edit.Command command)
        { 
            command.PhoneNumber = phoneNumber;
            return await _mediator.Send(command);
        }

        [HttpDelete("{phoneNumber}")]
        public async Task<ActionResult<Unit>> Delete(string phoneNumber)
        {
            return await _mediator.Send(new Delete.Command{PhoneNumber = phoneNumber});
        }

    }
}