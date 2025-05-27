using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Acme.Ecommerce.Products;
using Acme.Ecommerce.Reviews;


namespace Acme.Ecommerce.Products
{
    public class ProductDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public int Quantity { get; set; }
        public string Thumbnail { get; set; }
    }
}


