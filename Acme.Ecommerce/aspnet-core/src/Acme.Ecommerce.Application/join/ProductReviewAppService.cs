using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Acme.Ecommerce.Join;
using Acme.Ecommerce.Products;
using Acme.Ecommerce.Reviews;

public class ProductReviewAppService : ApplicationService
{
    private readonly IRepository<Product, Guid> _productRepository;
    private readonly IRepository<Review, Guid> _reviewRepository;

    public ProductReviewAppService(
        IRepository<Product, Guid> productRepository,
        IRepository<Review, Guid> reviewRepository)
    {
        _productRepository = productRepository;
        _reviewRepository = reviewRepository;
    }

    public async Task<List<ProductReviewDto>> GetProductReviewsAsync()
    {
        var productQueryable = await _productRepository.GetQueryableAsync();
        var reviewQueryable = await _reviewRepository.GetQueryableAsync();

        var query = from product in productQueryable
                    join review in reviewQueryable
                    on product.Id equals review.ProductId
                    select new ProductReviewDto
                    {
                        ProductTitle = product.Title,
                        ProductCategory = product.Category,
                        ReviewComment = review.Comment,
                        ReviewRating = review.Rating,
                        ReviewerName = review.ReviewerName,
                        ReviewDate = review.Date
                    };

        return await AsyncExecuter.ToListAsync(query);

    }

    public async Task<List<ReviewDto>> GetReviewsByProductIdAsync(Guid productId)
    {
        var reviewQueryable = await _reviewRepository.GetQueryableAsync();

        var reviews = from review in reviewQueryable
                      where review.ProductId == productId
                      select new ReviewDto
                      {
                          Id = review.Id,
                          Comment = review.Comment,
                          Rating = review.Rating,
                          ReviewerName = review.ReviewerName,
                          Date = review.Date,
                          ProductId = review.ProductId,
                          UserId = review.UserId
                      };

        return await AsyncExecuter.ToListAsync(reviews);
    }

    public async Task<List<ProductDto>> GetSearchItem(string Searchterm)
    {
        var productQueryable = await _productRepository.GetQueryableAsync();
        var products = from product in productQueryable
                       where product.Title.Contains(Searchterm) || product.Category.Contains(Searchterm)
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
        return await AsyncExecuter.ToListAsync(products);
    }
}

