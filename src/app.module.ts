import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabiesModule } from './babies/babies.module';
import { ParentsModule } from './parents/parents.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { FoodIntroductionsModule } from './food-introductions/food-introductions.module';

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
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_DATABASE_NAME),
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    BabiesModule,
    ParentsModule,
    FoodIntroductionsModule,
  ],
  providers: [GlobalAppGuardPipe, GlobalAppValidationPipe],
})
export class AppModule {}
