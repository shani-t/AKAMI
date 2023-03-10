import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { StatesModule } from './states.module';
import { FilesComponent } from './pages/files/files.component';

@NgModule({
  declarations: [AppComponent, FilesComponent],
  imports: [BrowserModule, HttpClientModule,BrowserAnimationsModule,
    SharedModule,
    NgxsModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    StatesModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
