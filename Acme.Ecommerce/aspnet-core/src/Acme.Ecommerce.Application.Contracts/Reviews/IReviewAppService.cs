using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Acme.Ecommerce.Reviews;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

using Acme.Ecommerce.Join;
namespace Acme.Ecommerce.Products
{
    public interface IReviewAppService : ICrudAppService<
        ReviewDto, Guid, ReviewListRequestDtocs,
        CreateUpdateReviewDto, CreateUpdateReviewDto>
    {
    
    }
}

