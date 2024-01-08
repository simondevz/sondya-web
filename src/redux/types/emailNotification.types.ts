export type OrderEmailNotificationType = {
  email: string;
  username: string;
  order_id?: string;
  order_status: string;
  product?: { product_name: string; qty: number; seller_name: string }[];
  service?: { name: string; seller_name: string };
  total_cost: number;
  date_ordered: string;
};
