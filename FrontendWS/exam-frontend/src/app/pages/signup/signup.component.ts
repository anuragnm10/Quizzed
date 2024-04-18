import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    if (this.user.username == null || this.user.username == '') {
      this.snack.open('Username is Required!', 'ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      });
      return;
    }

    this.userService.registerUser(this.user).subscribe(
      (data: any) => {
        this.user = {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        };
        console.log(data);
        Swal.fire('Success!', 'User ' + data.username + ' is registered!');
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
      }
    );
  }

  clear() {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }
}
