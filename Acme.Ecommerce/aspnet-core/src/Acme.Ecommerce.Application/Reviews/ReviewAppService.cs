using System;
using System.Threading.Tasks;
using Acme.Ecommerce.Reviews;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp;

namespace Acme.Ecommerce.Products
{
    public class ReviewAppService : CrudAppService<
        Review, ReviewDto, Guid, ReviewListRequestDtocs,
        CreateUpdateReviewDto, CreateUpdateReviewDto>, IReviewAppService
    {
        public ReviewAppService(IRepository<Review, Guid> repository) : base(repository)
        {
        }

        
    }
}

