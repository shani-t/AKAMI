import { HttpModule, Module } from '@nestjs/common';
import { FilesModule } from './files.module';

@Module({
  imports: [
    HttpModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
