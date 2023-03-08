import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesService {

  constructor(
    private http: HttpClient,
  ) {}

  getFiles(): Observable<any>{
    return this.http.get('http://localhost:3000/files');
  }

  getFilesFiltered(search: string): Observable<any>{
    return this.http.get(`http://localhost:3000/files?q=${search}`);
  }
}
