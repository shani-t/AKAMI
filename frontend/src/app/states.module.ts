import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FilesState } from './pages/files/store/files.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([
      FilesState,
    ]),
  ]
})
export class StatesModule { }
