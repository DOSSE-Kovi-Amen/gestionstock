import type { Product } from "./product";

export interface Statistic {
  total: {
    sales: number;
    products: number;
    spends: number;
    losses: number;
    categories: number;
    stocks: number;
    clients: number;
    suppliers: number;
    outOfStock: number;
    bestSeller: any
    chartLine: any
  };

  day: {
    sales: number;
    products: number;
    spends: number;
    losses: number;
    categories: number;
    stocks: number;
    clients: number;
    suppliers: number;
  };
  week: {
    sales: number;
    products: number;
    spends: number;
    losses: number;
    categories: number;
    stocks: number;
    clients: number;
    suppliers: number;
  };
  month: {
    sales: number;
    products: number;
    spends: number;
    losses: number;
    categories: number;
    stocks: number;
    clients: number;
    suppliers: number;
  };
  year: {
    sales: number;
    products: number;
    spends: number;
    losses: number;
    categories: number;
    stocks: number;
    clients: number;
    suppliers: number;
  };
}
