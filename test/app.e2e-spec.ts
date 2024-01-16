import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { applyAppSettings } from '../src/settings/apply-app-setting';
import { UsersService } from '../src/features/users/application/users.service';
import { skipSettings } from './base/skip-settings';
import { aDescribe } from './base/aDescribe';
import { UserServiceMockObject } from './base/mock/user.service.mock';
import { UsersTestManager } from './base/UsersTestManager';
import { expectLength } from './base/utils/expect-length.test-utils';
import { UserCreateModel } from '../src/features/users/api/models/input/create-user.input.model';

const TEST_ADMIN_CREDENTIALS = {
  login: 'test',
  password: 'qwerty',
};

// Кастомная реализация пропуска тестов
aDescribe(skipSettings.for('appTests'))('AppController (e2e)', () => {
  let app: INestApplication;
  let userTestManger: UsersTestManager;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(UserServiceMockObject)
      //.useClass(UserServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();

    // Применяем все настройки приложения (pipes, guards, filters, ...)
    applyAppSettings(app);

    await app.init();

    // Init userManager
    userTestManger = new UsersTestManager(app);

    // change env
    console.log(process.env.ENV);

    const loginResult = await UsersTestManager.login(
      app,
      TEST_ADMIN_CREDENTIALS.login,
      TEST_ADMIN_CREDENTIALS.password,
    );

    // Работа с состоянием
    expect.setState({
      adminAccessToken: loginResult.accessToken,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (POST)', async () => {
    // Work with state
    const { adminAccessToken } = expect.getState();

    const createModel: UserCreateModel = {
      name: 'qwerty',
      email: 'some-email@gg.cc',
    };

    const createResponse = await userTestManger.createUser(
      adminAccessToken,
      createModel,
    );

    userTestManger.expectCorrectModel(createModel, createResponse.body);

    const updateModel = { name: 'qwerty_777' };

    const updateResponse = await userTestManger.updateUser(
      adminAccessToken,
      updateModel,
    );

    userTestManger.expectCorrectModel(updateModel, updateResponse.body);
  });

  it('Auxiliary functions', async () => {
    const array = [1, 2, 3];

    expectLength(array, 3);

    // === false
    expect(false).toBeFalsy();
    // === true
    expect(true).toBeTruthy();
    // === null
    expect(null).toBeNull();
    // Свойство в объекте присутствует
    expect('Any string').toBeDefined();

    // Любая строка
    expect('Any string').toEqual(expect.any(String));
    // Любой массив
    expect([]).toEqual(expect.any(Array));

    // not null
    expect(100).not.toBeNull();
  });
});
