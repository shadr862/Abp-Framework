using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Acme.Ecommerce.Products;

namespace Acme.Ecommerce.Reviews
{
    public class ReviewDto : EntityDto<Guid>
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public string ReviewerName {  get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
    }

}
