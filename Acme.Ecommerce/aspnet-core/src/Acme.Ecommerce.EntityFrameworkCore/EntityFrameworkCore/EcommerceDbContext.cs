using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Acme.Ecommerce.Reviews;
using Acme.Ecommerce.Products;
using Acme.Ecommerce.Users;
using Acme.Ecommerce.Orders;
using Acme.Ecommerce.Addresses;
using Acme.Ecommerce.OrderedProducts;



namespace Acme.Ecommerce.EntityFrameworkCore
{
    [ReplaceDbContext(typeof(IIdentityDbContext))]
    [ReplaceDbContext(typeof(ITenantManagementDbContext))]
    [ConnectionStringName("Default")]
    public class EcommerceDbContext :
        AbpDbContext<EcommerceDbContext>,
        IIdentityDbContext,
        ITenantManagementDbContext
    {
        // Module Entities
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public DbSet<User> RegisteredUser{ get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderedProduct> OrderedProducts { get; set; }

        public DbSet<Address> Address{ get; set; }




        // Identity Module Entities
        public DbSet<IdentityUser> Users { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }
        public DbSet<IdentityClaimType> ClaimTypes { get; set; }
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
        public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
        public DbSet<IdentityLinkUser> LinkUsers { get; set; }
        public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
        public DbSet<IdentitySession> Sessions { get; set; }

        // Tenant Management Entities
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Module Configurations
            builder.ConfigurePermissionManagement();
            builder.ConfigureSettingManagement();
            builder.ConfigureBackgroundJobs();
            builder.ConfigureAuditLogging();
            builder.ConfigureIdentity();
            builder.ConfigureOpenIddict();
            builder.ConfigureFeatureManagement();
            builder.ConfigureTenantManagement();


            builder.Entity<Order>(b =>
            {
                b.ToTable("Orders");
                b.ConfigureByConvention();

                b.HasOne(o => o.Address)
                 .WithOne(a => a.Order)
                 .HasForeignKey<Order>(o => o.AddressId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Address>(b =>
            {
                b.ToTable("Address");
                b.ConfigureByConvention();
            });



        }
    }
}




