using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Acme.Ecommerce.Orders; // Assuming Order is in the same namespace or adjust accordingly

namespace Acme.Ecommerce.Addresses
{
    public class Address :AggregateRoot<Guid>
    {
        public string Country { get; set; }
        public string Division { get; set; }
        public string City { get; set; }
        public string Street { get; set; }

        public virtual Order Order { get; set; }
    }
}
