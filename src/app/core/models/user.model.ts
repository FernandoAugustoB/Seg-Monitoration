export type UserRole = 'operator' | 'supervisor';

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  shiftStart: string; // Format: HH:mm
  shiftEnd: string;   // Format: HH:mm
  active: boolean;
  permissions?: string[];
}

export interface AuthUser extends Omit<User, 'password'> {
  token?: string;
  loginTime: Date;
}
