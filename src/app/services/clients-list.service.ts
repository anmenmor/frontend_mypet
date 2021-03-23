import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Clients } from '../models/clients';
import { Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientsListService {
  private CLIENTS_API_SERVER ="http://localhost:8000/api/clientsList";
  constructor(private http: HttpClient) {}

  listAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.CLIENTS_API_SERVER);
  }


}
