import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getBase64ImageFromURL(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap(blob => {
        return from(new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.toString());
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }));
      })
    );
  }
}
