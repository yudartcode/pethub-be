import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { PetsModule } from './modules/pets/pets.module';
import { AuthModule } from './modules/auth/auth.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { AdoptionRequestModule } from './modules/adoption_request/adoption_request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [
        __dirname + '/../../modules/**/entities/*.entity{.ts,.js}',
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: process.env.NODE_ENV !== 'prod',
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    PetsModule,
    ShelterModule,
    AdoptionRequestModule,
  ],
})
export class AppModule {}
