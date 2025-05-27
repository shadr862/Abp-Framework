using System;
using Volo.Abp.Application.Dtos;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.OrderedProducts;
using System.Collections.Generic;

namespace Acme.Ecommerce.Orders
{
    public class OrderDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Guid UserId { get; set; }
        public AddressDto Address { get; set; }

        public List<OrderedProductDto> OrderedProducts { get; set; } = new();
    }
}


