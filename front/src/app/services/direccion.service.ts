import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private token:string;
  constructor(
    private http: HttpClient
  ) {
    this.token = '74aeef9d-f912-4e94-9a32-bffaa2276abe';
  }

  serchByCP(cp:string){
    return this.http.get(`https://api-sepomex.hckdrk.mx/query/info_cp/${cp}?token=${this.token}`)
            .pipe(
              map((data:any) => {
                return data;
              })
            );
  }

}
