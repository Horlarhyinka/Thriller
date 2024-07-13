import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback,  } from 'passport-google-oauth20';
import * as passport from "passport"
import { googleConfig } from './config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: googleConfig.clientId, // Replace with your Google Client ID
      clientSecret: googleConfig.clientSecret, // Replace with your Google Client Secret
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  private getInfo(accessToken: string){

  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      id: profile.id
    };
    
    done(null, user);
  }
}
