import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { RoleGuard } from '@/common/guards/role.guard';
import { SessionSerializer } from './lib/serializer';
import { TwitterStrategy } from './lib/twitter.strategy';
import { GoogleStrategy } from './lib/google.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleGuard,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    TwitterStrategy
  ],
  exports: [PassportModule],
})
export class AuthModule {}
