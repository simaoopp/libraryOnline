import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(public db: AngularFireDatabase) { }
  

  addSocialMedia(userID: string, SocialMedia: any) {
    return this.db.object(`/users/${userID}/SocialMedia`).set(Object.assign(SocialMedia));

  }
}
