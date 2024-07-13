import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { BrokerService } from 'src/broker/broker.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/config/google-strategy.config';
import { CacheService } from 'src/cache/cache.service';

@Module({
  providers: [AuthService, BrokerService, UserService, GoogleStrategy, CacheService],
  controllers: [AuthController],
  imports: [UserModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), PassportModule.register({defaultStrategy: "google"})]
})
export class AuthModule {}
