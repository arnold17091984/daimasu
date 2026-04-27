export type ItemSet = {
  id: number;
  tenant_id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
export type ItemType = {
  id: number;
  tenant_id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductItem = {
  id: number;
  tenant_id: number;
  name: string;
  description: string;
  amount: Money;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  related?: {
    images?: Media;
  };
};

export type Money = {
  value: string;
  currency: string;
  formatted: string;
  symbol: string;
  default_fraction_digits: number;
  display_value: string;
  words: string;
  currency_country: string;
};

export type Media = {
  id: string | number;
  uuid: string;
  name: string;
  mime_type: string;
  order_column: number;
  size: number;
  created_at: string;
  file_name: string;
  updated_at: string;
  url: string;
};
