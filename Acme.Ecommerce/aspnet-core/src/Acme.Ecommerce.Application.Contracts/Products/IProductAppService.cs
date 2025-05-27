using System;
using Acme.Ecommerce.Products.Acme.Ecommerce.Products;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.Ecommerce.Products
{
    public interface IProductAppService : ICrudAppService<
    ProductDto, Guid, ProductListRequestDto,
    CreateUpdateProductDto, CreateUpdateProductDto>
    {
    }
}


