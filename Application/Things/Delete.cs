using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;

namespace Application.Things
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                if (thing == null)
                    throw new Exception("Could not find activity");

                _context.Remove(thing);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}