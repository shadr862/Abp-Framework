using System;
using System.Collections.Generic;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.OrderedProducts;
using Volo.Abp.Application.Dtos;

namespace Acme.Ecommerce.Orders
{
    public class CreateUpdateOrderDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Guid UserId { get; set; }
        public CreateUpdateAddressDto Address { get; set; }

        public List<CreateUpdateOrderedProductDto> OrderedProducts { get; set; } = new();
    }
}


