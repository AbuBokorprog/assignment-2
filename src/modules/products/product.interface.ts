interface Variants {
  type: string;
  value: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants: Array<Variants>;
  inventory: {
    quantity: number;
    inStock: boolean;
  };
}

export { Product };
