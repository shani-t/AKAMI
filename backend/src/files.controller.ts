import { Controller, Get, Param, Query} from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Get()
  async getFilesFiltered(@Query('q') q: string) {
     return this.filesService.getFilesFiltered(q);
  }

}
