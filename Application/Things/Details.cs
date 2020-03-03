using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain;
using MediatR;

namespace Application.Things
{
    public class Details
    {
        public class Query : IRequest<Thing>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Thing>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Thing> Handle(Query request, CancellationToken cancellationToken)
            {
                var thing = await _context.Things.FindAsync(request.Id);

                return thing;
            }
        }
    }
}