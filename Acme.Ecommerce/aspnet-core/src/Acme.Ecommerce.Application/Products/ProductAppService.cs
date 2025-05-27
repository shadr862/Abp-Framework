using System;
using System.Threading.Tasks;
using Acme.Ecommerce.Products.Acme.Ecommerce.Products;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.Linq;
using System.Collections.Generic;

namespace Acme.Ecommerce.Products
{
    public class ProductAppService : CrudAppService<
        Product, ProductDto, Guid, ProductListRequestDto,
        CreateUpdateProductDto, CreateUpdateProductDto>, IProductAppService
    {
        private readonly IRepository<Product, Guid> _repository;
        public ProductAppService(IRepository<Product, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<ProductDto>> GetBeautyProduct()
        {
            var productQueryable = await _repository.GetQueryableAsync();
            var query = from product in productQueryable
                        where product.Category == "beauty"
                        select new ProductDto
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Category = product.Category,
                            Price = product.Price,
                            Stock = product.Stock,
                            Quantity = product.Quantity,
                            Thumbnail = product.Thumbnail
                        };
            return await AsyncExecuter.ToListAsync(query);

        }
        public async Task<List<ProductDto>> GetFragrancesProduct()
        {
            var productQueryable = await _repository.GetQueryableAsync();
            var query = from product in productQueryable
                        where product.Category == "fragrances"
                        select new ProductDto
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Category = product.Category,
                            Price = product.Price,
                            Stock = product.Stock,
                            Quantity = product.Quantity,
                            Thumbnail = product.Thumbnail
                        };
            return await AsyncExecuter.ToListAsync(query);

        }

        public async Task<List<ProductDto>> GetFurnitureProduct()
        {
            var productQueryable = await _repository.GetQueryableAsync();
            var query = from product in productQueryable
                        where product.Category == "furniture"
                        select new ProductDto
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Category = product.Category,
                            Price = product.Price,
                            Stock = product.Stock,
                            Quantity = product.Quantity,
                            Thumbnail = product.Thumbnail
                        };
            return await AsyncExecuter.ToListAsync(query);

        }
        public async Task<List<ProductDto>> GetGroceriesProduct()
        {
            var productQueryable = await _repository.GetQueryableAsync();
            var query = from product in productQueryable
                        where product.Category == "groceries"
                        select new ProductDto
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Category = product.Category,
                            Price = product.Price,
                            Stock = product.Stock,
                            Quantity = product.Quantity,
                            Thumbnail = product.Thumbnail
                        };
            return await AsyncExecuter.ToListAsync(query);

        }

        public async Task<List<ProductDto>> GetClothingProduct()
        {
            var queryable = await _repository.GetQueryableAsync();

            var filtered = queryable
                .Where(p => p.Category == "men's clothing" || p.Category == "women's clothing")
                .Select(product => new ProductDto
                {
                    Id = product.Id,
                    Title = product.Title,
                    Description = product.Description,
                    Category = product.Category,
                    Price = product.Price,
                    Stock = product.Stock,
                    Quantity = product.Quantity,
                    Thumbnail = product.Thumbnail
                });

            return await AsyncExecuter.ToListAsync(filtered); // no Take, load all matching
        }




        public async Task<List<ProductDto>> GetElectronicsAndJeweleryProduct()
        {
            var productQueryable = await _repository.GetQueryableAsync();
            var query = from product in productQueryable
                        where product.Category == "jewelery" | product.Category == "electronics"
                        select new ProductDto
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Category = product.Category,
                            Price = product.Price,
                            Stock = product.Stock,
                            Quantity = product.Quantity,
                            Thumbnail = product.Thumbnail
                        };
            return await AsyncExecuter.ToListAsync(query);

        }

        

       
    }
}

