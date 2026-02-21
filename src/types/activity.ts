export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  categoryId: string;
  category: Category;
  title: string;
  description: string;
  imageUrls: string[];
  price: number;
  price_discount: number;
  rating: number;
  total_reviews: number;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
  createdAt: string;
  updatedAt: string;
};
