export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  author: string;
  content: string;
}
