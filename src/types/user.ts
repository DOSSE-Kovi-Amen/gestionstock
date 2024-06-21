export interface authLogin {
  email: string;
  password: string;
}
// types/userList.ts
export interface User {
  id: string;
  name:string;
  username: string;
  email: string;
  photo:string;
  phone_number: string;
  is_owner: boolean;
  roles: string;
  status: number;
  created_at: string;
  updated_at: string;
  activate_date: string;
  deactivate_date: string | null;
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
