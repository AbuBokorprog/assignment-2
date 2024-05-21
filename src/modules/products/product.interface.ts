interface Variants {
  type: string;
  value: string;
}

interface Inventory {
  quantity: number;
  inStock: boolean;
}

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Array<Variants>;
  inventory: Inventory;
}

export { Product, Variants, Inventory };
