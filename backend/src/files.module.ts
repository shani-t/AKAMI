import { HttpModule, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 120000,
      maxRedirects: 5,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesController, FilesService],
  exports: [FilesService]
})
export class FilesModule {}
