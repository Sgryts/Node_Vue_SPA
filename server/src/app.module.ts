import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from './photos/photos.module';
import { GenresModule } from './genres/genres.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [PhotosModule, GenresModule, AuthModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
