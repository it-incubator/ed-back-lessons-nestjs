import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserCreateModel } from '../../src/features/users/api/models/input/create-user.input.model';

export class UsersTestManager {
  constructor(protected readonly app: INestApplication) {}
  // можно выносить некоторые проверки в отдельные методы для лучшей читаемости тестов
  expectCorrectModel(createModel: any, responseModel: any) {
    expect(createModel.name).toBe(responseModel.name);
    expect(createModel.email).toBe(responseModel.email);
  }

  async createUser(adminAccessToken: string, createModel: UserCreateModel) {
    return request(this.app.getHttpServer())
      .post('/api/users')
      .auth(adminAccessToken, {
        type: 'bearer',
      })
      .send(createModel)
      .expect(200);
  }

  async updateUser(adminAccessToken: string, updateModel: any) {
    return request(this.app.getHttpServer())
      .put('/api/users')
      .auth(adminAccessToken, {
        type: 'bearer',
      })
      .send(updateModel)
      .expect(204);
  }

  static async login(
    app: INestApplication,
    login: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // await request(app.getHttpServer())
    //   .post('/login')
    //   .send({ login, password })
    //   .expect(200);

    return { accessToken: 'qwerty.access.token' };
  }
}
