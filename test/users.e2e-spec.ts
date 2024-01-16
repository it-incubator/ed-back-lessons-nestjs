import { initSettings } from './base/init-settings';
import { UsersTestManager } from './base/UsersTestManager';
import { INestApplication } from '@nestjs/common';
import { UsersService } from '../src/features/users/application/users.service';
import { UserServiceMock } from './base/mock/user.service.mock';

describe('users', () => {
  let app: INestApplication;
  let userTestManger: UsersTestManager;

  beforeAll(async () => {
    const result = await initSettings((moduleBuilder) =>
      moduleBuilder.overrideProvider(UsersService).useClass(UserServiceMock),
    );
    app = result.app;
    userTestManger = result.userTestManger;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create user', async () => {
    const body = { name: 'name111', email: 'email@email.em' };

    const response = await userTestManger.createUser('', body);

    expect(response.body).toEqual({ ...body, id: expect.any(String) });
  });
});
