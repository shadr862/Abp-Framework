using System;
using Acme.Ecommerce.Join;
using System.Collections.Generic;
using System.Threading.Tasks;
using Acme.Ecommerce.Users;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.Linq;




namespace Acme.Ecommerce.Users
{
    public class UserAppService : CrudAppService<
           User, UserDto, Guid, UserListRequestDto,
           CreateUpdateUserDto, CreateUpdateUserDto>, IUserAppService
    {
        private readonly IRepository<User, Guid> _userRepository;
        public UserAppService(IRepository<User, Guid> repository) : base(repository)
        {
            _userRepository = repository;
        }


        public async Task<UserDto?> CheckingValidUserAsync(string email, string password)
        {
            var userQueryable = await _userRepository.GetQueryableAsync();

            var query = from user in userQueryable
                        where user.Email == email && user.Password == password
                        select new UserDto
                        {
                            Id = user.Id,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Email = user.Email,
                            Password = user.Password,
                        };

            return await AsyncExecuter.FirstOrDefaultAsync(query);
        }

    }
}