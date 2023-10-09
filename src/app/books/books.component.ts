import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  searchQuery: string = '';
  searchResults: any[] = [];
  selectedBookId: number | null = null;

  performBeautySearch() {
      // Implement your search logic here
      console.log('Performing beauty search for: ' + this.searchQuery);
  }
  
  books: any[] = [];

  constructor(private bookService: BooksService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  search(): void {
    this.bookService.getBooks().subscribe((items) => {
      this.searchResults = items.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log(this.searchResults);
    });
  }

  openBookDetailsModal(book): void {
    const dialogRef = this.dialog.open(BookDetailsModalComponent, {
      data: book
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Book details modal closed:', result);
    });
  }
}
