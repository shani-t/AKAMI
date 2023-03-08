import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilesComponent } from './files.component';
import { FilesState } from './store/files.state';

describe('FilesComponent', () => {
  let component: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesComponent,
      ],
      imports: [ RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([FilesState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FilesComponent', () => {
    expect(component).toBeTruthy();
  });

});