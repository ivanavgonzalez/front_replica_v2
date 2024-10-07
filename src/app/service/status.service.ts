import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl = 'http://20.97.157.219:8005/api/';

  constructor(private http: HttpClient) { }

  getStatus(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'StatusShop').toPromise();
  }

  getTramasLocal(rst_id: number, desde: Date, hasta: Date): Promise<any> {
    const desdeFormateada = desde.toISOString().slice(0, 10).replace(/-/g, '');
    const hastaFormateada = hasta.toISOString().slice(0, 10).replace(/-/g, '');
    let data = {
      "rst_id": rst_id,
      "fecha_inicio": desdeFormateada,
      "fecha_fin": hastaFormateada
    }
    return this.http.post<any>(this.apiUrl + 'routes/getByIdRestaurantAndDate', JSON.stringify(data)).toPromise();
  }
}
