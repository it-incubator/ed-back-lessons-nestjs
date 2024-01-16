import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {applyAppSettings} from "../src/settings/apply-app-setting";
import {UsersService} from "../src/features/users/application/users.service";
import {UsersRepository} from "../src/features/users/infrastructure/users.repository";

const UserServiceMockObject = {
    sendMessage: jest.fn()
        .mockImplementation(async () => {
                console.log('Call mock method sendPasswordRecoveryMail / MailService')
                return true;
            }
        )
}

class UserServiceMock {
    constructor(
        private usersRepository: UsersRepository,
    ) {
    }

    sendMessage: () => true
}

const testAdmin = {
    login: 'test',
    password: 'qwerty'
}

export const skipSettings = {
    run_all_tests: false,

    appTests: true,
    appTests2: true,
    appTests3: true,
    appTests4: true,
    appTests5: true,
    appTests6: true,
    appTests7: true,
    appTests8: false,
    appTests9: true,

    for(testName: TestsNames): boolean {
        // If we need run all tests without skip
        if (this.run_all_tests) {
            return false;
        }

        // if test setting exist we need return his setting
        if (typeof this[testName] === 'boolean') {
            return this[testName];
        }

        return false;
    },
};

export type TestsNames = 'appTests'


export const aDescribe = (skip: boolean): jest.Describe => {
    if (skip) {
        return describe.skip;
    }
    return describe;
};

aDescribe(skipSettings.for('appTests')) ('AppController (e2e)', () => {
    let app: INestApplication;
    let dataSource: any;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(UsersService)
            .useFactory({
                    factory: (usersRepo: UsersRepository) => {
                        return new UserServiceMock(usersRepo);
                    },
                    inject: [UsersRepository]
                }
            )
            //.useClass(UserServiceMock)
            //.useValue(UserServiceMockObject)
            .compile();


        app = moduleFixture.createNestApplication();

        applyAppSettings(app);

        await app.init();

        dataSource = app.resolve(DataSource);
        const result = await login(app, testAdmin.login, testAdmin.password);

        expect.setState({
            adminAccessToken: result.accessToken
        })

    });

    it('/ (GET)', async () => {
        const {adminAccessToken} = expect.getState();



        const resp = await request(app.getHttpServer())
            .post('/create')
            .auth(adminAccessToken, {
                type: 'bearer'
            })
            .send({userName: 'qwerty'})
            .expect(201);


        const userFromDB = await dataSource.findById(resp.body.id);

        expect(userFromDB.name).toBe(resp.body.name)

        const array = [1, 2, 3]

        expectLength(array, 3)
    });
});




export const expectLength = (arr: any[], toBeLength: number) => {
    expect(arr.length).toBe(toBeLength);
};

const login =  async (app: INestApplication, login: string, password: string): Promise<{accessToken: string}> => {
    await request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');

    return {accessToken: "aenfgjisengdr"}
}
