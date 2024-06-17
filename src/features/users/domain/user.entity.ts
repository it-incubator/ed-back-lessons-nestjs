import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {randomUUID} from 'crypto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    createdAt: Date;

    static createUser(name: string, email: string | null) {
        const user = new this();

        user.name = name;
        user.email = email ?? `${randomUUID()}_${name}@it-incubator.io`;

        return user;
    }

    getName() {
        return this.name;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);
