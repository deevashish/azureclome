import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book = {};
  message:string;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }
  deleteBook(id) {
    var data = JSON.parse(localStorage.getItem("currentUser"));
    if(!data)
    {
      this.router.navigate(['/login']);
    }
    else if(data['role']!='admin')
    {
      this.message="You donot have permission to delete this book ";
    }
    else
    {
      this.api.deleteBook(id)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
    }
    
  }
  editBook(id)
  {
    var data = JSON.parse(localStorage.getItem("currentUser"));
    if(!data)
    {
      this.router.navigate(['/login']);
    }
    else if(data['role']!='admin')
    {
      this.message="You donot have permission to edit this book ";      
    }
    else
    {
      this.router.navigate(['/book-edit/' + id]);
    }
  }
  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);    
  }

}
