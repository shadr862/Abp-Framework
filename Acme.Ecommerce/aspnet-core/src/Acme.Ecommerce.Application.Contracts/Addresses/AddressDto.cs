using System;
using Volo.Abp.Application.Dtos;

namespace Acme.Ecommerce.Addresses
{
    public class AddressDto : AuditedEntityDto<Guid>
    {
        public string Country { get; set; }
        public string Division { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
    }
}


