using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Acme.Ecommerce.Orders
{
    public interface IOrderAppService:ICrudAppService<OrderDto, Guid, OrderListRequestDto, CreateUpdateOrderDto,CreateUpdateOrderDto>
    {
    }
}
