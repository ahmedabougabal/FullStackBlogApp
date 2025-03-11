import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsString({
    message: 'Title must be a string',
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Title cannot exceed 100 characters',
  })
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsNotEmpty({
    message: 'Author is required',
  })
  @IsString({
    message: 'Author must be a string',
  })
  @MinLength(2, {
    message: 'Author name must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'Author name cannot exceed 50 characters',
  })
  @Transform(({ value }) => value?.trim())
  author: string;

  @IsNotEmpty({
    message: 'Content is required',
  })
  @IsString({
    message: 'Content must be a string',
  })
  @MinLength(10, {
    message: 'Content must be at least 10 characters long',
  })
  @Transform(({ value }) => value?.trim())
  content: string;

  @IsOptional()
  @IsString({
    message: 'Image URL must be a string',
  })
  @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i, {
    message: 'Invalid image URL format. Must be a valid URL ending with png, jpg, jpeg, gif, or webp',
  })
  @Transform(({ value }) => value?.trim())
  imageUrl?: string;
}
