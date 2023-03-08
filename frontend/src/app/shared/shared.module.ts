import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import {NonePipe} from '../pipes';

@NgModule({
  declarations: [NonePipe],
  imports: [
    FlexLayoutModule, 
    CommonModule, 
    MaterialModule, 
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    NonePipe
  ],
})
export class SharedModule {}
