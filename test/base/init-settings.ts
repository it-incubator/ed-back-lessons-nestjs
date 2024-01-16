import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { UsersService } from '../../src/features/users/application/users.service';
import { UserServiceMockObject } from './mock/user.service.mock';
import { applyAppSettings } from '../../src/settings/apply-app-setting';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { deleteAllData } from './utils/delete-all-data';
import { UsersTestManager } from './UsersTestManager';
import { appSettings } from '../../src/settings/app-settings';

export const initSettings = async (
  addSettingsToModuleBuilder?: (moduleBuilder: TestingModuleBuilder) => void,
) => {
  console.log('in tests ENV: ', appSettings.env.getEnv());
  const testingModuleBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(UsersService)
    .useValue(UserServiceMockObject);

  if (addSettingsToModuleBuilder) {
    addSettingsToModuleBuilder(testingModuleBuilder);
  }

  const testingAppModule = await testingModuleBuilder.compile();

  const app = testingAppModule.createNestApplication();

  applyAppSettings(app);

  await app.init();

  const databaseConnection = app.get<Connection>(getConnectionToken());
  const httpServer = app.getHttpServer();
  const userTestManger = new UsersTestManager(app);

  await deleteAllData(databaseConnection);

  //TODO:переписать через setState
  return {
    app,
    databaseConnection,
    httpServer,
    userTestManger,
  };
};
