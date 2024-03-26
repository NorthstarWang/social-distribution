import { Author } from "./author";

export interface AuthResponse {
  data: {
    logged_in: boolean;
    user?: Author;
  }
}
  