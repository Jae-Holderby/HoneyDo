using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Things
{
    public class List
    {
        public class Query : IRequest<List<Thing>> {}

        public class Handler : IRequestHandler<Query, List<Thing>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Thing>> Handle(Query request, CancellationToken cancellationToken)
            {
                var things = await _context.Things.ToListAsync(cancellationToken);

                return things;
            }
        }

    }
}