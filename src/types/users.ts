export interface authLogin {
  login: string;
  password: string;
}
// types/userList.ts
export interface User {
  id: string;
  username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string | null;
  cni: string | null;
  passport: string | null;
  last_login: string;
  is_agent: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  status: number;
  rating: number;
  reviews: number;
  created: string;
  modified: string;
  activate_date: string;
  deactivate_date: string | null;
}

// types/userList.ts
export interface UserList {
  type: string;
  id: string;
  attributes: {
    username: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    full_name: string;
    email: string;
    phone_number: string | null;
    cni: string | null;
    passport: string | null;
    last_login: string;
    is_agent: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    status: number;
    rating: number;
    reviews: number;
    created: string;
    modified: string;
    activate_date: string;
    deactivate_date: string | null;
  };
}

export interface UserCreate {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  password: string;
  password2:string;
}
