using System.Collections.Generic;
using System;
using Volo.Abp.Domain.Entities;
using Acme.Ecommerce.Reviews;


namespace Acme.Ecommerce.Products
{
    public class Product :AggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public int Quantity { get; set; }
        public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();
        public string Thumbnail { get; set; }
    }
}



