import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilesService } from './files.service';
import { FilesState } from './store/files.state';

describe('UsersService', () => {
  let service: FilesService;
  let originalTimeout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        NgxsModule.forRoot([FilesState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(FilesService);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created UsersService', () => {
    expect(service).toBeTruthy();
  });


  it('should getAll func',  (done) => {
    service.getFiles().subscribe({
      next(res){
        expect(res.length).toEqual(1);
        done();
      },
      error(msg) {
        console.log('Error:', msg);
        done();
      }
    });
  });

   it('should filter by "app"',  (done) => {
      service.getFilesFiltered('app')
      .subscribe({
          next(res){
            expect(res[0].files.length).toEqual(1);
            expect(res[0].directories[0].files.length).toEqual(0);
            expect(res[0].directories[0].directories[0].files.length).toEqual(5);
            done();
          },
          error(msg) {
            console.log('Error: ', msg);
            done();
          }
        });
      });

      it('should filter by "appasd"',  (done) => {
        service.getFilesFiltered('appasd')
        .subscribe({
            next(res){
                expect(res[0].files.length).toEqual(0);
                expect(res[0].directories[0].files.length).toEqual(0);
                expect(res[0].directories[0].directories[0].files.length).toEqual(0);
              done();
            },
            error(msg) {
              console.log('Error: ', msg);
              done();
            }
          });
        });
      
});