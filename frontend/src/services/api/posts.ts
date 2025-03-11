import axios from 'axios';
import { Post, CreatePostDto } from '../../types';

const API_URL = 'http://localhost:3000';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};
