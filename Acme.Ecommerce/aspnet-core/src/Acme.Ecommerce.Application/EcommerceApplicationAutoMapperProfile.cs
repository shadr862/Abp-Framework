using AutoMapper;
using Acme.Ecommerce.Products;
using Acme.Ecommerce.Reviews;
using Acme.Ecommerce.Users;
using Acme.Ecommerce.Orders;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.Products.Acme.Ecommerce.Products;
using Acme.Ecommerce.OrderedProducts;

namespace Acme.Ecommerce
{
    public class EcommerceApplicationAutoMapperProfile : Profile
    {
        public EcommerceApplicationAutoMapperProfile()
        {
            // Product
            CreateMap<Product, ProductDto>();
            CreateMap<CreateUpdateProductDto, Product>();

            // Review
            CreateMap<Review, ReviewDto>();
            CreateMap<CreateUpdateReviewDto, Review>();

            // User
            CreateMap<User, UserDto>();
            CreateMap<CreateUpdateUserDto, User>();

            // Order
            CreateMap<Order, OrderDto>();
            CreateMap<CreateUpdateOrderDto, Order>();

            // Address
            CreateMap<Address, AddressDto>();
            CreateMap<CreateUpdateAddressDto, Address>();

            //OrderedProduct
            CreateMap<OrderedProduct, OrderedProductDto>();
            CreateMap<CreateUpdateOrderedProductDto, OrderedProduct>();
        }
    }
}


