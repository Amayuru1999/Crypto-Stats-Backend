import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [
        UsersModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
              },
            }),
            inject: [ConfigService],
          }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,EncryptionService],
  exports:[EncryptionService],
  
})
export class AuthModule {}
