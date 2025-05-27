using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.Ecommerce.Products;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Acme.Ecommerce.Users;

namespace Acme.Ecommerce.Reviews
{
    public class Review:AggregateRoot<Guid>
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public string ReviewerName {  get; set; }

        // Foreign key
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }

        // Foreign key
        public Guid UserId { get; set; }
        public virtual User User { get; set; }


    }
}
