import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  reset() {
    this.loginData = {
      username: '',
      password: '',
    };
  }

  formSubmit() {
    console.log('Login btn click');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !!', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect  if admin : admin-dashboard
          //else user-dashboard

          if (this.login.getUserRole() == 'Admin') {
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'USER') {
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error: any) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
