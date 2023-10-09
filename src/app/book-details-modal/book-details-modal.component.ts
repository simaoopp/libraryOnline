import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css']
})
export class BookDetailsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
