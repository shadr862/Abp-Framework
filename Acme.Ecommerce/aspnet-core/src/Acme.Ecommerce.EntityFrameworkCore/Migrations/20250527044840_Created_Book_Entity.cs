using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Acme.Ecommerce.Migrations
{
    /// <inheritdoc />
    public partial class Created_Book_Entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Divison",
                table: "Address",
                newName: "Division");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Division",
                table: "Address",
                newName: "Divison");
        }
    }
}
