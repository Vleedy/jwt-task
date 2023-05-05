export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface Data {
  title: string;
  [key: string]: any;
}

export interface DecodedToken {
  iat: number;
  [key: string]: any;
}
