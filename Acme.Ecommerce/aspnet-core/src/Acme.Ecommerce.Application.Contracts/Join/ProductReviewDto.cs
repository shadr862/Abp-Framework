using System;

namespace Acme.Ecommerce.Join
{
    public class ProductReviewDto
    {
        public string ProductTitle { get; set; }
        public string ProductCategory { get; set; }
        public string ReviewComment { get; set; }
        public int ReviewRating { get; set; }
        public string ReviewerName { get; set; }
        public DateTime ReviewDate { get; set; }
    }

}

