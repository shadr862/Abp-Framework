using System;
using System.Linq;
using System.Threading.Tasks;
using Acme.StackOverflow.PostTags;
using Acme.StackOverflow.Tags;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Acme.StackOverflow.Posts
{
    public class PostAppService : CrudAppService<
        Post,
        PostDto,
        Guid,
        ListRequestDto,
        CreateUpdatePostDto>,
        IPostAppService
    {
        private readonly IRepository<PostTag, Guid> _postTagRepo;
        private readonly IRepository<Tag, Guid> _tagRepo;

        public PostAppService(
            IRepository<Post, Guid> repository,
            IRepository<PostTag, Guid> postTagRepo,
            IRepository<Tag, Guid> tagRepo)
            : base(repository)
        {
            _postTagRepo = postTagRepo;
            _tagRepo = tagRepo;
        }

        public override async Task<PostDto> CreateAsync(CreateUpdatePostDto input)
        {
            var post = ObjectMapper.Map<CreateUpdatePostDto, Post>(input);
            post.Score = 0;

            await Repository.InsertAsync(post, autoSave: true);

            foreach (var tagId in input.TagIds)
            {
                var postTag = new PostTag
                {
                    PostId = post.Id,
                    TagId = tagId
                };

                await _postTagRepo.InsertAsync(postTag);
            }

            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(post.Id); // ✅ Reuse GetAsync
        }

        public override async Task<PostDto> UpdateAsync(Guid id, CreateUpdatePostDto input)
        {
            var post = await Repository.GetAsync(id);
            ObjectMapper.Map(input, post); // Use simple map since entity already loaded

            await Repository.UpdateAsync(post);

            var oldTags = await _postTagRepo.GetListAsync(pt => pt.PostId == id);
            foreach (var pt in oldTags)
            {
                await _postTagRepo.DeleteAsync(pt);
            }

            foreach (var tagId in input.TagIds)
            {
                await _postTagRepo.InsertAsync(new PostTag
                {
                    PostId = id,
                    TagId = tagId
                });
            }

            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(id); // ✅ Reuse GetAsync
        }



        public override async Task<PostDto> GetAsync(Guid id)
        {
            var post = await Repository.GetAsync(id);

            var postDto = ObjectMapper.Map<Post, PostDto>(post);

            var postTags = await _postTagRepo.GetListAsync(pt => pt.PostId == id);
            var tagIds = postTags.Select(pt => pt.TagId).ToList();
            var tags = await _tagRepo.GetListAsync(t => tagIds.Contains(t.Id));

            postDto.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(tags);

            return postDto;
        }

        public override async Task<PagedResultDto<PostDto>> GetListAsync(ListRequestDto input)
        {
            var queryable = await Repository.GetQueryableAsync();

            var totalCount = await queryable.CountAsync();

            var posts = await queryable
                .OrderByDescending(p => p.Id) // Add OrderBy to avoid split-query issue
                .Take(input.MaxResultCount)
                .ToListAsync();

            var dtoList = new List<PostDto>();

            foreach (var post in posts)
            {
                var postDto = ObjectMapper.Map<Post, PostDto>(post);

                var postTags = await _postTagRepo.GetListAsync(pt => pt.PostId == post.Id);
                var tagIds = postTags.Select(pt => pt.TagId).ToList();
                var tags = await _tagRepo.GetListAsync(t => tagIds.Contains(t.Id));

                postDto.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(tags);

                dtoList.Add(postDto);
            }

            return new PagedResultDto<PostDto>(totalCount, dtoList);
        }

        public override async Task DeleteAsync(Guid id)
        {
            var postTags = await _postTagRepo.GetListAsync(pt => pt.PostId == id);
            foreach (var pt in postTags)
            {
                await _postTagRepo.DeleteAsync(pt);
            }

            await Repository.DeleteAsync(id);
        }

        private async Task<PostDto> MapPostWithTagsToDtoAsync(Post post)
        {
            var dto = ObjectMapper.Map<Post, PostDto>(post);

            var postTags = await _postTagRepo.GetListAsync(pt => pt.PostId == post.Id);
            var tagIds = postTags.Select(pt => pt.TagId).ToList();
            var tags = await _tagRepo.GetListAsync(t => tagIds.Contains(t.Id));

            dto.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(tags);

            return dto;
        }


        public async Task<List<PostDto>> GetAnswersAsync(Guid questionId)
        {
            var queryable = await Repository.GetQueryableAsync();

            var answers = await queryable
                .Where(p => p.PostType == PostType.Answer && p.ParentId == questionId)
                .ToListAsync();

            var answerDtos = new List<PostDto>();
            foreach (var answer in answers)
            {
                var dto = await MapPostWithTagsToDtoAsync(answer); // reuse existing method
                answerDtos.Add(dto);
            }

            return answerDtos;
        }


    }
}

