import { Role } from '../model/employee';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
}

export interface AuthUserResponse {
  authUser: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredential {
  info?: string;
  password: string;
}

export class CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  password: string;
}

export interface CreateEmployeeResponse {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  roles: Role[];
}

export const defaultRole = {
  id: 'sasa',
  name: 'staff',
  permission: 'can_view',
};
