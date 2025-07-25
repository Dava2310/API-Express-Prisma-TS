export interface JWTPayload {
  userId: number;
  iat?: number; // issued at
  exp?: number; // expires at
  sub?: string; // subject
}
