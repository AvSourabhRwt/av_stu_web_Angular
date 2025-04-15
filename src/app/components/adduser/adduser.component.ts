import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';



@Component({
  selector: 'app-adduser',
  imports: [ReactiveFormsModule , RouterModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})

export class  AdduserComponent {
  UserpostForm: FormGroup;
  userId: string | null = null;

  constructor(private _baseRepository: BaseRepository,private activatedRoute:ActivatedRoute) {

    this.UserpostForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.userId  = params['userId']; 
      this.getUserById(Number(this.userId));
    });
  }


  onSubmit(): void {
    if (this.UserpostForm.valid) {
      const postdata = {
        id: this.UserpostForm.value.id,
        userId:5,
      };
      var product = 'users/add';
      this._baseRepository.request(product, 'POST', postdata).subscribe({
        next: (data:any) => {
          alert('success')
          console.log(data);
        },
      
      });
    } else {
      console.log('Form is invalid');
    }
  }

  getUserById(userId: number): void {
    this._baseRepository.request<any>(`users/${userId}`, 'GET').subscribe({
      next: (data) => {
      this.UserpostForm.patchValue({
        id:data.id,
        username: data.username,
        email: data.email,
        age: data.age || 25 // Default value if age is missing
      });
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }



}