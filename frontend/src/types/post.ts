import { Author } from "@/types/author";

export interface Post {
  id: string;
  author: Author;
  source: string;
  origin: string;
  title: string;
  description: string;
  contentType: string;
  content: string;
  published: Date;
  visibility: 'PUBLIC' | 'FRIENDS' | 'UNLISTED';
  count: number;
  commentsSrc?: string;
}