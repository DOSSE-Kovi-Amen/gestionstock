export interface authLogin {
  login: string;
  password: string;
}
// types/userList.ts
export interface User {
  id: string;
  name:string;
  email: string;
  phoneNumber: string;
  lastLogin: string;
  isOwner: boolean;
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
}
