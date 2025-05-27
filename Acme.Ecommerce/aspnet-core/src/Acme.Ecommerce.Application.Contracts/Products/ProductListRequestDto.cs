using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Acme.Ecommerce.Products
{
    public class ProductListRequestDto : PagedAndSortedResultRequestDto
    {
        public ProductListRequestDto()
        {
            MaxResultCount = 1000; // ✅ Default to 1000 instead of 10
        }
    }
}
