using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Acme.Ecommerce.OrderedProducts
{
    public class OrderedProductDto : AuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public string Thumbnail { get; set; }
        public Guid ProductId { get; set; }
    }
}
