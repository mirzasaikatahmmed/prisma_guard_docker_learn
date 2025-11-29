// twitter.strategy.ts
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { AuthService } from '../auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      callbackURL: process.env.TWITTER_CALLBACK_URL || '',
      scope: ['users.read', 'tweet.read'],
      clientType: 'confidential',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const username = profile.username || profile?.username || profile?.screen_name || profile?.id;
    const displayName = profile.displayName || profile?.name || profile?.display_name || username;

    const user = await this.authService.validateTwitterUser({
      username: String(username),
      displayName: String(displayName),
      accessToken,
      refreshToken,
    });

    return user || null;
  }
}