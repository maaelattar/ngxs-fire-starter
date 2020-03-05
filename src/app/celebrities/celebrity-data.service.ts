import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
import { Celebrity } from './celebrity.model';
@Injectable({
  providedIn: 'root'
})
export class CelebrityDataService {
  baseUrl = 'celebrities';
  subscription;
  constructor(private angularFirestore: AngularFirestore) { }

  getCelebrities(): Observable<Celebrity[]> {
    return this.angularFirestore
      .collection<Celebrity>(this.baseUrl)
      .valueChanges({ idField: 'id' });
  }
  getCelebrity(id: string): Observable<Celebrity> {
    return this.angularFirestore.collection(this.baseUrl).doc<Celebrity>(id).valueChanges()
  }
}
