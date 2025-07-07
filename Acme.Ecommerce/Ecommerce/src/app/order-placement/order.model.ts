interface Address {
  country: string;
  division: string;
  city: string;
  street: string;
}

interface OrderedProduct {
  id: string; // UUID string
  title: string;
  category: string;
  price: number;
  quantity:number;
  thumbnail: string;
  productId: string; // UUID string
}

interface UserOrder {
  name: string;
  phoneNumber: string;
  userId: string; // UUID string
  address: Address;
  orderedProducts: OrderedProduct[];
}
