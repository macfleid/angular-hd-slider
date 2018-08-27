import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { from } from 'rxjs';
import {ResponseContentType} from '@angular/http';

@Injectable()
export class HdSliderService {

  constructor(private http: HttpClient) {
  }

  getImageData64(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}
