import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FilesComponent } from './files.component';
import { FilesRoutingModule } from './files-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FilesComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FilesRoutingModule,
    SharedModule,
  ],
  
})
export class FilesModule {}
