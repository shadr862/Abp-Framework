using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.StackOverflow.AppUsers
{
    public class AppUserAppService : CrudAppService<
        AppUser,
        AppUserDto,
        Guid,
        ListRequestDto,
        CreateUpdateAppUserDto,
        CreateUpdateAppUserDto>,
        IAppUserAppService
    {
        public AppUserAppService(IRepository<AppUser, Guid> repository)
            : base(repository)
        {
        }
    }
}
