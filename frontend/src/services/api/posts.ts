import axios from 'axios';
import { Post, CreatePostDto, UpdatePostDto } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
  try {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

export const updatePost = async (id: number, post: UpdatePostDto): Promise<Post> => {
  try {
    const response = await axios.patch(`${API_URL}/posts/${id}`, post);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update post');
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};
