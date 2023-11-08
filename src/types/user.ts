export interface authLogin {
  login: string;
  password: string;
}
// types/userList.ts
export interface User {
  id: string;
  name:string;
  username: string;
  email: string;
  photo:string;
  phoneNumber: string;
  isOwner: boolean;
  roles: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  activate_date: string;
  deactivate_date: string | null;
}
export interface UserCreate {
  name:string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword :string;
  roles:any;
}
