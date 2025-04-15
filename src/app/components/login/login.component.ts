import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {


  loginForm: FormGroup;
  
  isLoggedIn:boolean=false;

  constructor(private _baseRepository:BaseRepository,private router: Router){

    this.loginForm = new FormGroup({
        UserName: new FormControl('', [Validators.required ]),
        Password: new FormControl('', [Validators.required ])
    });
  }


  ngOnInit(){
    this.isLoggedIn = this._baseRepository.isLoggedIn();
    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }
  }


 
  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.UserName,  
        password: this.loginForm.value.Password
      };
      var loginUrl = 'auth/login';
      this._baseRepository.request<any>(loginUrl, 'POST', loginData).subscribe({
        next: (data) => {
          console.log(data);
          this._baseRepository.saveToken(data.accessToken);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error('Error creating post:', err)
      });
    } else {
      console.log('Form is invalid');
    }
  }
}