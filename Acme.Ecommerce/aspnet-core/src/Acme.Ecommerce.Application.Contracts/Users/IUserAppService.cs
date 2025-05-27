using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Acme.Ecommerce.Users
{
    public interface IUserAppService: ICrudAppService<UserDto,Guid,UserListRequestDto,CreateUpdateUserDto,CreateUpdateUserDto>
    {
    }
}
