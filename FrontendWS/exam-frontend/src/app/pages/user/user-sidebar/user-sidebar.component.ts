import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  categories: any;

  constructor(private cat: CategoryService, private snak: MatSnackBar) {}

  ngOnInit(): void {
    this.cat.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.snak.open('Error in loading categories from server!', '', {
          duration: 3000,
        });
      }
    );
  }
}
