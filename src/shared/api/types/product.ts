export type ProductTypes = 'continuous' | 'discrete';

export type Product = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  total: number;
  type: ProductTypes;
  created_at: string;
  updated_at: string;
};
