// src/app/models/token-response.ts
export interface TokenResponse {
  message: string;
  token: string;
  refreshToken: string;
}


export interface Register {
  name: string;
  mobilenumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}