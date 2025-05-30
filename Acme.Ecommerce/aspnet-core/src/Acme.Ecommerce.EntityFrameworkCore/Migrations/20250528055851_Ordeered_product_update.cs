using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Acme.Ecommerce.Migrations
{
    /// <inheritdoc />
    public partial class Ordeered_product_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "OrderedProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "OrderedProducts");
        }
    }
}
