import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(public db: AngularFireDatabase) { 

  }

  updateUserIMG(id: string, img: string) {
    return this.db
      .object(`users/${id}`)
      .update({ img: img});
  }

  updateUser(id: string, name: string, job: string, phone: string) {
    return this.db
      .object(`users/${id}`)
      .update({ name: name, job: job, phone: phone });
  }
}
