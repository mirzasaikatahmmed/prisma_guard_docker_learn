import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor() {}

  async create(createPostDto: CreatePostDto) {
    return { message: 'Post created', data: createPostDto };
  }

  async findAll() {
    return { message: 'All posts', data: [] };
  }

  async findOne(id: string) {
    return { message: `Post ${id}`, data: null };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return { message: `Post ${id} updated`, data: updatePostDto };
  }

  async remove(id: string) {
    return { message: `Post ${id} removed` };
  }
}