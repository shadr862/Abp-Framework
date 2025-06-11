using System;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;

namespace Acme.StackOverflow.Posts
{
    public interface IPostAppService : ICrudAppService<
        PostDto,
        Guid,
        ListRequestDto,
        CreateUpdatePostDto,
        CreateUpdatePostDto>
    {
    }
}

