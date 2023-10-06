import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GetService } from './get.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userLoggedIn: boolean = false; 

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  constructor(public dialog: MatDialog, private auth:AuthService, private afAuth: AngularFireAuth, private get: GetService) {
    
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.userLoggedIn = !!user;
    });
  }
  
  logout() {
    this.auth.logout();
  }
}
