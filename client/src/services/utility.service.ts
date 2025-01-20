import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IUtility } from '../models/IUtility';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  loadUtility(): Observable<IUtility[]> {
    return this.http.get<IUtility[]>(`${this.baseUrl}/api/utility-type`);
  }

  saveUtility(data: IUtility): Observable<IUtility> {
    return this.http.post<IUtility>(`${this.baseUrl}/api/utility-type`, data);
  }

  updateUtility(id: string,data: IUtility): Observable<IUtility> {
    return this.http.put<IUtility>(`${this.baseUrl}/api/utility-type/${id}`, data);
  }

  deleteUtility(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/utility-type/${id}`);
  }
}
