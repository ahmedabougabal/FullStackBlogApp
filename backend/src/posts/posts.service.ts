import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postsRepository.create(createPostDto);
      const savedPost = await this.postsRepository.save(post);
      return savedPost;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to create post: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return posts;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to fetch posts: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to fetch post: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.findOne(id);
      Object.assign(post, updatePostDto);
      return await this.postsRepository.save(post);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to update post: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const post = await this.findOne(id);
      await this.postsRepository.remove(post);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to delete post: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
