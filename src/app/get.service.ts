import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(public db: AngularFireDatabase) { }

  getById(userID: string): Observable<any> {
    return this.db.object(`/users/${userID}`).valueChanges();
  }
}
