import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect([]);
  });

  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Test Post', author: 'Test Author', content: 'Test Content' })
      .expect(201);
  });

  it('/posts/:id (GET)', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Test Post', author: 'Test Author', content: 'Test Content' });

    return request(app.getHttpServer())
      .get(`/posts/${post.body.id}`)
      .expect(200)
      .expect(post.body);
  });

  it('/posts/:id (DELETE)', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Test Post', author: 'Test Author', content: 'Test Content' });

    return request(app.getHttpServer())
      .delete(`/posts/${post.body.id}`)
      .expect(200);
  });
});