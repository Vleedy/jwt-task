export interface AuthResponse {
  token: string;
  time: string;
}

export interface Data {
  title: string;
  [key: string]: any;
}

export interface DecodedToken {
  iat: number;
  [key: string]: any;
}
