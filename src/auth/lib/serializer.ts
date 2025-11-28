import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(user: User, done: (err: any, id?: number | string) => void) {
        console.log('Serializer User');
        done(null, user.id);
    }

    async deserializeUser(id: number | string, done: (err: any, user?: User | null) => void) {
        const user = await this.authService.findUser(id as any);
        console.log('Deserialize User');
        console.log(user);
        done(null, user ?? null);
    }
}