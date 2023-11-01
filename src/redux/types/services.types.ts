export type AdminCreateService = {
  name: string;
  user: string;
  category: string;
  brief_description: string;
  description: string;
  tag: string;
  current_price: number;
  service_status: string;
};

export type AdminUpdateService = {
  name: string;
  user: string;
  category: string;
  brief_description: string;
  description: string;
  tag: string;
  current_price: number;
  service_status: string;

  id: string;
};
