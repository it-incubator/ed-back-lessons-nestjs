import {Module} from '@nestjs/common';
import configuration from './settings/configuration';
import {ConfigModule} from '@nestjs/config';
import {BlogsModule} from "./features/blogs/blogs.module";
import {UsersModule} from "./features/users/users.module";
import {TestingModule} from "./features/testing/testing.module";
import {AuthModule} from "./features/auth/auth.module";

@Module({
    imports: [
        AuthModule,
        BlogsModule,
        UsersModule,
        TestingModule.register(),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),],
    controllers: [],
    providers: []
})
export class AppModule {
}
