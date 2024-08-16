import type { Role } from "firebase/vertexai-preview";

export interface authLogin {
  email: string;
  password: string;
}

// Define the User interface
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone_number: string;
  photo: string | null;
  organization_id: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[]; // An array of Role objects
}

export interface UserCreate {
  name:string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword :string;
  roles:any;
}
