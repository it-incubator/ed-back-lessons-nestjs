import { UsersRepository } from '../../../src/features/users/infrastructure/users.repository';

//  .overrideProvider(UsersService)
//  .useValue(UserServiceMockObject)
export const UserServiceMockObject = {
  sendMessageOnEmail() {
    console.log('Call mock method sendMessageOnEmail / MailService');
    return Promise.resolve(true);
  },
};

export const UserServiceMockObjectForSpecificTest = {
  sendMessageOnEmail() {
    console.log(
      'Call mock method sendMessageOnEmail / MailService, for specific test',
    );
    return Promise.resolve(true);
  },
};

//  .overrideProvider(UsersService)
//  .useClass(UserServiceMock)
// or
// .overrideProvider(UsersService)
// .useFactory({
//      factory: (usersRepo: UsersRepository) => {
//          return new UserServiceMock(usersRepo);
//      },
//      inject: [UsersRepository]
//      }
//     )
export class UserServiceMock {
  constructor(private usersRepository: UsersRepository) {}

  sendMessageOnEmail() {
    return Promise.resolve(true);
  }
}
