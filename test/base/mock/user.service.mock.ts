import { UsersRepository } from '../../../src/features/users/infrastructure/users.repository';
import { UsersService } from '../../../src/features/users/application/users.service';

//  .overrideProvider(UsersService)
//  .useValue(UserServiceMockObject)
export const UserServiceMockObject = {
  sendMessageOnEmail() {
    console.log('Call mock method sendMessageOnEmail / MailService');
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
// @ts-ignore
export class UserServiceMock extends UsersService {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  sendMessageOnEmail() {
    console.log(
      'Call mock method sendMessageOnEmail / MailService, for specific test',
    );
    return Promise.resolve(true);
  }
}
