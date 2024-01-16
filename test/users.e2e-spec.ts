import { initSettings } from './base/init-settings';
import { UsersTestManager } from './base/UsersTestManager';
import { INestApplication } from '@nestjs/common';
import { UsersService } from '../src/features/users/application/users.service';
import { UserServiceMockObject } from './base/mock/user.service.mock';

describe('users', () => {
  let app: INestApplication;
  let userTestManger: UsersTestManager;

  beforeAll(async () => {
    const result = await initSettings((moduleBuilder) =>
      moduleBuilder
        .overrideProvider(UsersService)
        .useValue(UserServiceMockObject),
    );
    app = result.app;
    userTestManger = result.userTestManger;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get users', async () => {
    const body = { name: 'name', email: 'email@email.em' };

    const response = await userTestManger.createUser('', body);

    expect(response.body).toEqual(body);
  });
});
