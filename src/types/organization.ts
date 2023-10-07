interface CEO {
  id: string;
  full_name: string;
}

export interface Organization {
  type?: string;
  id?: string;
  attributes: {
    name: string;
    slug: string;
    description: string;
    cfe: null | any; // Le type de cfe est indéfini dans votre exemple
    ceo: CEO;
    created?: string;
    modified?: string;
  };
}