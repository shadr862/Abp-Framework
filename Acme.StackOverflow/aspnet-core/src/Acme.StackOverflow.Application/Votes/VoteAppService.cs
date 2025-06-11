using System;
using System.Threading.Tasks;
using Acme.StackOverflow.Votes;
using Acme.StackOverflow;
using AutoMapper.Internal.Mappers;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

public class VoteAppService : CrudAppService<Vote, VoteDto, Guid, ListRequestDto, CreateUpdateVoteDto, CreateUpdateVoteDto>, IVoteAppService
{
    public VoteAppService(IRepository<Vote, Guid> repository) : base(repository)
    {
    }

    public override async Task<VoteDto> CreateAsync(CreateUpdateVoteDto input)
    {
        // Try to find existing vote by the user on the post
        var existingVote = await Repository.FirstOrDefaultAsync(v =>
            v.PostId == input.PostId && v.AppUserId == input.AppUserId);

        if (existingVote == null)
        {
            // No existing vote, create new one
            var vote = new Vote
            {
                PostId = input.PostId,
                AppUserId = input.AppUserId,
                VoteType = input.VoteType
            };

            await Repository.InsertAsync(vote);
            return ObjectMapper.Map<Vote, VoteDto>(vote);
        }
        else
        {
            // Update existing vote type if different
            if (existingVote.VoteType != input.VoteType)
            {
                existingVote.VoteType = input.VoteType;
                await Repository.UpdateAsync(existingVote);
            }

            return ObjectMapper.Map<Vote, VoteDto>(existingVote);
        }
    }
}
