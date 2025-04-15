import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactus',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  userForm : FormGroup;
  usersId: any;


  constructor(private _baseRepository: BaseRepository ,private activatedRoute:ActivatedRoute){

    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.usersId  = params['usersId']; // ✅ Get query param
      this.getusersById(this.usersId);
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    debugger


    if (this.userForm.valid) {
      const postdata = {
        firstName: 'Muhammad',
        lastName: 'Ovi',
        age: 250,
      };
      var product = 'users/add';
      this._baseRepository.request(product, 'POST', postdata).subscribe({
        next: (data: any) => {
          alert('success')
          console.log(data);
        },
      });
    
    } else  {
        console.log('Form is invalid');
      };
  };


  getusersById(usersId: Number): void {
    this._baseRepository.request<any>(`users/${usersId}`, 'GET').subscribe({
      next: (data) => {
      this.userForm.patchValue({
        firstName:data.firstName,
        lastName: data.lastName,
        age: data.age,
      });
      },
  }
  
  )};
  
  
}
  



