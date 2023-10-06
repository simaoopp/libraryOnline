import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  
  constructor(public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, private auth: AuthService) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  connectWithGoogle() {
    this.auth.signInWithGoogle();
    this.dialogRef.close();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    this.auth.login(email, password).subscribe((res) => {
      this.loginForm.reset();
      this.closeDialog();
    }),
      (err) => {};
  }
}
