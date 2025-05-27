using System;
using System.ComponentModel.DataAnnotations;

namespace Acme.Ecommerce.Products
{
    public class CreateUpdateReviewDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public string ReviewerName { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
    }
}
