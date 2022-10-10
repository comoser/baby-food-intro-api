import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabiesModule } from './babies/babies.module';
import { ParentsModule } from './parents/parents.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { FoodIntroductionsModule } from './food-introductions/food-introductions.module';
import { MailModule } from './mail/mail.module';

const GlobalAppGuardPipe = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

const GlobalAppValidationPipe = {
  provide: APP_PIPE,
  useClass: ValidationPipe,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ...(process.env.NODE_ENV === 'production'
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    AuthModule,
    BabiesModule,
    ParentsModule,
    FoodIntroductionsModule,
    MailModule,
  ],
  providers: [GlobalAppGuardPipe, GlobalAppValidationPipe],
})
export class AppModule {}
