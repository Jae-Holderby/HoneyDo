using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;

namespace Application.Persons
{
    public class Edit
    {
        public class Command : IRequest
        {
            [StringLength(10, MinimumLength = 10)]
           public string PhoneNumber { get; set; }
           [Required]
           public string Name { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var person = await _context.Persons.FindAsync(request.PhoneNumber);

                if(person ==  null)
                    throw new Exception("Could not find activity");
                
                person.Name = request.Name ?? person.Name;

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}