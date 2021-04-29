import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Consultation } from '../models/consultation';
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

  listAvailablePetsPagination(clientId: number, numPage: number = 1): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PETS_API_SERVER, {params: {page:numPage.toString(), available: "true", client_id: clientId.toString()}});
  };

  listAllPetsPagination(clientId: number, numPage: number = 1): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PETS_API_SERVER, {params: {page:numPage.toString(), client_id: clientId.toString()}});
  };

  listAvailablePets(clientId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PETS_API_SERVER, {params: {available: "true", client_id: clientId.toString()}});
  };

  listAllPets(clientId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PETS_API_SERVER, {params: {client_id: clientId.toString()}});
  };


  getPetDetail(petId: number): Observable<Pet>{
    return this.http.get<Pet>(this.PETS_API_SERVER + '/' + petId);
  }

  getCompletePetList(): Observable<Pet>{
    return this.http.get<Pet>(this.PETS_API_SERVER);
  }
  
  updatePet(updateData: Pet, petId: number): Observable<Pet>{
    const body = {'name': updateData.name, 'sex': updateData.sex, 'weight': updateData.weight, 'age': updateData.age, 
    'species': updateData.species,'breed': updateData.breed, 'available': updateData.available};
    return this.http.put<Pet>(this.PETS_API_SERVER + '/' + petId, body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        alert("Algo ha ido mal, intentelo de nuevo mas tarde");
              console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
                return throwError('Something bad happened; please try again later.');
      })
    )
  }

  getConsultations(petId: number): Observable<Consultation[]>{
    return this.http.get<Consultation[]>(this.PETS_API_SERVER + '/' + petId + '/consultations' );
  }

  getConsultationsPagination(petId: number, numPage: number = 1): Observable<Consultation[]>{
    return this.http.get<Consultation[]>(this.PETS_API_SERVER + '/' + petId + '/consultations', {params: {page:numPage.toString()}} );
  }

  createConsultation(petId: number, employeeId: string, comments: string): Observable<Consultation> {
      const body = {'date_time': new Date().toISOString().slice(0, 19).replace('T', ' '), 'comments': comments,'employee_id': employeeId};
      return this.http.post<Consultation>(this.PETS_API_SERVER + '/' + petId + '/consultations', body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert("Algo ha ido mal, intentelo de nuevo mas tarde");
                console.error(
                  `Backend returned code ${error.status}, ` +
                  `body was: ${error.error}`);
                  return throwError('Something bad happened; please try again later.');
        })
      )
  }
}
