using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.Users; // Ensure you have the correct namespace for User
using Acme.Ecommerce.OrderedProducts; // Ensure you have the correct namespace for OrderedProduct

namespace Acme.Ecommerce.Orders
{
    public class Order : AggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public string status { get; set; }
        public string deliveryMethod {  get; set; }

        public Guid AddressId { get; set; } // Foreign key for Address one to one relationship
        public virtual Address Address { get; set; } // Fully qualify the Address type  

        public Guid UserId { get; set; }// foreingn key for User one to many relationship
        public virtual User User { get; set; }

        public ICollection<OrderedProduct> OrderedProducts { get; set; } = new List<OrderedProduct>();
    }
}
