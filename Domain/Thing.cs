using System;
using System.Collections.Generic;

namespace Domain
{
    public class Thing
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string PhoneNumber { get; set; }
    }
}