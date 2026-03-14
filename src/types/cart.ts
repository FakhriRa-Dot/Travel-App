export interface Activity {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface Cart {
  id: string;
  quantity: number;
  activity: Activity;
}
