import { Author } from "@/types/author";

export interface AuthResponse {
  data: {
    logged_in: boolean;
    user?: Author;
  }
}
  