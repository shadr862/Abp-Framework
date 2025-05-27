using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.Ecommerce.Reviews;
using Volo.Abp.Domain.Entities;
using Acme.Ecommerce.Orders;

namespace Acme.Ecommerce.Users
{
    public class User:AggregateRoot<Guid>
    {
        public string FirstName { get; set; } 

        public string LastName { get; set; } 

        public string Email { get; set; } 

        public string Password { get; set; } 

        public string ConfirmPassword { get; set; }

        public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();
        public virtual ICollection<Order> Orders { get; set; } = new HashSet<Order>();
    }

}
