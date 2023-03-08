import { Controller, Get, Param} from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Get()
  async getAllFiles() {
     return this.filesService.getAllFiles();
  }
  @Get(':search')
  async getFilesFiltered(@Param('search') search: string) {
     return this.filesService.getFilesFiltered(search);
  }

}
