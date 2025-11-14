export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  rubro?: string;
  telefono?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}