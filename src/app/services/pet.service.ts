import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private PETS_API_SERVER ="http://localhost:8000/api/pets";
  constructor(private http: HttpClient) {}

  createPet(pet: Pet, clientId: number): Observable<Pet>{
    const body = {'name': pet.name, 'sex': pet.sex, 'weight': pet.weight, 'age': pet.age, 'species': pet.species, 'client_id': clientId,
  'breed': pet.breed};
  return this.http.post<Pet>(this.PETS_API_SERVER, body)
  .pipe(
    catchError((error: HttpErrorResponse) => {
      alert("Algo ha ido mal, intentelo de nuevo mas tarde");
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
              return throwError('Something bad happened; please try again later.');
    })
  )};

  listAllPets(clientId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PETS_API_SERVER, {params: {available: "true", client_id: clientId.toString()}});
  };
  
}
