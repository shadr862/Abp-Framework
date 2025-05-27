using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.OrderedProducts;
using Volo.Abp.Application.Dtos;
using Microsoft.EntityFrameworkCore;



namespace Acme.Ecommerce.Orders
{
    public class OrderAppService : CrudAppService<
        Order, OrderDto, Guid, OrderListRequestDto,
        CreateUpdateOrderDto, CreateUpdateOrderDto>, IOrderAppService
    {
        private readonly IRepository<Address, Guid> _addressRepository;
        private readonly IRepository<OrderedProduct, Guid> _orderedProductRepository;

        public OrderAppService(
            IRepository<Order, Guid> repository,
            IRepository<Address, Guid> addressRepository,
            IRepository<OrderedProduct, Guid> orderedProductRepository)
            : base(repository)
        {
            _addressRepository = addressRepository;
            _orderedProductRepository = orderedProductRepository;
        }

        public override async Task<OrderDto> CreateAsync(CreateUpdateOrderDto input)
        {
            // Save address
            var address = ObjectMapper.Map<CreateUpdateAddressDto, Address>(input.Address);
            await _addressRepository.InsertAsync(address);

            // Save order
            var order = ObjectMapper.Map<CreateUpdateOrderDto, Order>(input);
            order.AddressId = address.Id;
            order.Address = address;
            order.OrderedProducts = new List<OrderedProduct>();

            await Repository.InsertAsync(order);

            // Save ordered products
            foreach (var orderedProductDto in input.OrderedProducts)
            {
                var orderedProduct = ObjectMapper.Map<CreateUpdateOrderedProductDto, OrderedProduct>(orderedProductDto);
                orderedProduct.OrderId = order.Id;
                await _orderedProductRepository.InsertAsync(orderedProduct);
            }

            // Map and return full order
            var result = ObjectMapper.Map<Order, OrderDto>(order);
            result.OrderedProducts = ObjectMapper.Map<List<OrderedProduct>, List<OrderedProductDto>>(
                await _orderedProductRepository.GetListAsync(p => p.OrderId == order.Id)
            );

            return result;
        }

        public override async Task<OrderDto> UpdateAsync(Guid id, CreateUpdateOrderDto input)
        {
            // Retrieve the existing order
            var order = await Repository.GetAsync(id);

            // Retrieve the associated address
            var address = await _addressRepository.GetAsync(order.AddressId);

            // Map updated values
            ObjectMapper.Map(input, order);
            ObjectMapper.Map(input.Address, address);

            // Update the address and order
            await _addressRepository.UpdateAsync(address);
            await Repository.UpdateAsync(order);

            // Retrieve existing ordered products without tracking
            var productsToDelete = await (await _orderedProductRepository.GetQueryableAsync())
                .Where(p => p.OrderId == order.Id)
                .AsNoTracking()
                .ToListAsync();

            // Delete existing ordered products
            foreach (var product in productsToDelete)
            {
                await _orderedProductRepository.DeleteAsync(product);
            }

            // Insert new ordered products
            foreach (var productDto in input.OrderedProducts)
            {
                var newProduct = ObjectMapper.Map<CreateUpdateOrderedProductDto, OrderedProduct>(productDto);
                newProduct.OrderId = order.Id;
                await _orderedProductRepository.InsertAsync(newProduct);
            }

            // Retrieve the updated order
            var updatedOrder = await Repository.GetAsync(id);

            // Map to DTO
            var result = ObjectMapper.Map<Order, OrderDto>(updatedOrder);

            // Retrieve and map ordered products
            var queryable = await _orderedProductRepository.GetQueryableAsync();
            var orderedProducts = await queryable
                .Where(p => p.OrderId == order.Id)
                .ToListAsync();

            result.OrderedProducts = ObjectMapper.Map<List<OrderedProduct>, List<OrderedProductDto>>(orderedProducts);

            return result;
        }



        public override async Task<OrderDto> GetAsync(Guid id)
        {
            // Load order with its address
            var order = await Repository.GetAsync(id);

            // Manually load Address
            order.Address = await _addressRepository.GetAsync(order.AddressId);

            // Map Order to DTO
            var dto = ObjectMapper.Map<Order, OrderDto>(order);

            // Load and map OrderedProducts
            var products = await _orderedProductRepository.GetListAsync(p => p.OrderId == id);
            dto.OrderedProducts = ObjectMapper.Map<List<OrderedProduct>, List<OrderedProductDto>>(products);

            return dto;
        }


        public override async Task<PagedResultDto<OrderDto>> GetListAsync(OrderListRequestDto input)
        {
            var result = await base.GetListAsync(input);

            foreach (var orderDto in result.Items)
            {
                // Load and attach OrderedProducts
                var products = await _orderedProductRepository.GetListAsync(p => p.OrderId == orderDto.Id);
                orderDto.OrderedProducts = ObjectMapper.Map<List<OrderedProduct>, List<OrderedProductDto>>(products);

                // Load and attach Address
                var orderEntity = await Repository.GetAsync(orderDto.Id);
                var address = await _addressRepository.GetAsync(orderEntity.AddressId);
                orderDto.Address = ObjectMapper.Map<Address, AddressDto>(address);
            }

            return result;
        }


        public override async Task DeleteAsync(Guid id)
        {
            // Delete related ordered products first
            var products = await _orderedProductRepository.GetListAsync(p => p.OrderId == id);
            foreach (var product in products)
            {
                await _orderedProductRepository.DeleteAsync(product);
            }

            // Load the order to get the related AddressId
            var order = await Repository.GetAsync(id);

            // Delete related address
            await _addressRepository.DeleteAsync(order.AddressId);

            // Finally, delete the order itself
            await base.DeleteAsync(id);
        }

    }
}




