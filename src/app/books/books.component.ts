import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  searchQuery: string = '';
  searchResults: any[] = [];

  performBeautySearch() {
      // Implement your search logic here
      console.log('Performing beauty search for: ' + this.searchQuery);
  }
  
  books: any[] = [];

  constructor(private bookService: BooksService) {}

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
}
