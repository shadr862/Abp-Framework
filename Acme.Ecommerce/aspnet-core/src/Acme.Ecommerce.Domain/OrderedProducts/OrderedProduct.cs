using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.Ecommerce.Reviews;
using Volo.Abp.Domain.Entities;
using Acme.Ecommerce.Orders;

namespace Acme.Ecommerce.OrderedProducts
{
    public class OrderedProduct :AggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public string Thumbnail { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }

    }
}
