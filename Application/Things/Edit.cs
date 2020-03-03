using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;

namespace Application.Things
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            [StringLength(100, MinimumLength = 5)]
            public string Description { get; set; }
            public DateTime? Date { get; set; }
            [StringLength(10, MinimumLength = 10)]
            public string PhoneNumber { get; set; } 
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
                var thing = await _context.Things.FindAsync(request.Id);

                if(thing ==  null)
                    throw new Exception("Could not find activity");
                
                thing.Description = request.Description ?? thing.Description;
                thing.Date = request.Date ?? thing.Date;
                thing.PhoneNumber = request.PhoneNumber ?? thing.PhoneNumber;

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}