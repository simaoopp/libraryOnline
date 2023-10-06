import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px', // Defina o tamanho do modal de acordo com suas necessidades
    });

    dialogRef.afterClosed().subscribe(result => {
      // Você pode adicionar código aqui para lidar com o resultado após o modal ser fechado, se necessário.
    });
  }
  
}
