import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { from } from 'rxjs';
import { user } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private auth: Auth,
    public db: AngularFireDatabase
  ) {}

  login(username: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, username, password).then(
        (value) => {
          console.log('sucess')
        }
      )
    );
  }

  signUp(user: any) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        user.email.toString(),
        user.password
      ).then((value) => {
        this.db
          .object('/users/' + value.user.uid)
          .set(Object.assign(user, { id: value.user.uid }));
      })
    );
  }

  signInWithGoogle() {
    const auth = getAuth(); // Get the Auth instance
    const provider = new GoogleAuthProvider(); // Create a Google Auth Provider instance
  
    // Sign in with Google using a popup
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        const utilizador: user = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          img: user.photoURL
        };
        this.db
            .object('/users/' + user.uid)
            .set(Object.assign(utilizador, { id: user.uid }));
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  async logout() {
    await this.auth.signOut();
  }

  getDefaultPhoto(){
    return this.db.object(`/defaultPhoto/img`).valueChanges();
  }
}
