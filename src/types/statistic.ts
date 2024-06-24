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
      chartLine:any
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
  