export interface Property {
  type: string;
  id: string;
  attributes: {
    created: string;
    modified: string;
    title: string;
    ref_code: string;
    description: string;
    country: string;
    city: string;
    street_address: string;
    price: string;
    tax: string;
    sqft: string;
    total_floors: number;
    bedrooms: number;
    bathrooms: number;
    garage: number;
    advert_type: string;
    property_type: string;
    published_status: boolean;
    views: number;
    is_boosted: boolean;
    is_deleted: boolean;
  };
  relationships: {
    agent: {
      data: {
        type: string;
        id: string;
      };
    };
    organization: {
      data: {
        type: string;
        id: string;
      };
    };
    tags: {
      data: any[]; // Vous pouvez remplacer `any[]` par le type approprié pour les données de tags si nécessaire
      meta: {
        count: number;
      };
    };
  };
}
