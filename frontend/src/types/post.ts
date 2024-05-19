import { Author } from "@/types/author";

export interface Post {
  id: string;
  author: Author;
  source_id: string;
  origin: string;
  title: string;
  content: string;
  created: string;
  modified: string;
  visibility: 'public' | 'unlisted';
  is_external: boolean;
}