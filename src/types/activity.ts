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
  createdAt: string;
  updatedAt: string;
};
