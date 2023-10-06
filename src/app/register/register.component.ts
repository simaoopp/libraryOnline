import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { user } from './user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  imageuploaded: any;
  defaultPhoto: any;

  onFileChange(event: any) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {

        const imageUrl = reader.result;

        this.imageuploaded = imageUrl;
        this.defaultPhoto = this.imageuploaded;
        };

    }

  }

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private auth: AuthService
  ) {

    this.auth.getDefaultPhoto().subscribe((photo) => {
      this.defaultPhoto = photo;
     });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  singUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get name() {
    return this.singUpForm.get('name');
  }

  get email() {
    return this.singUpForm.get('email');
  }
  get password() {
    return this.singUpForm.get('password');
  }

  connectWithGoogle() {
    this.auth.signInWithGoogle();
    this.dialogRef.close();
  }

  submit() {
    let img: any; 
    if(this.imageuploaded === undefined) {
      img = this.defaultPhoto;
    } else {
      img = this.imageuploaded;
    }
    console.log(img);
    const utilizador: user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      img: img
    };
    if (!this.singUpForm.valid) return;
    this.auth.signUp(utilizador).subscribe(() => {
      this.auth.logout();
      this.dialogRef.close();
    });
  }
}
