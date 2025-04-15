import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseRepository } from '../../services/base.repository';



@Component({
  selector: 'app-addtodo',
  imports: [ReactiveFormsModule ,RouterModule],
  templateUrl: './addtodo.component.html',
  styleUrl: './addtodo.component.css'
})
export class AddtodoComponent {

  TodoForm: FormGroup
 
  userId: any;

  constructor(private _baseRepository: BaseRepository ,private activatedRoute:ActivatedRoute){
    this.TodoForm = new FormGroup({
     
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),

    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId  = params['userId']; // ✅ Get query param
      this.getTodosById(this.userId);
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    debugger
    
    if (this.TodoForm.valid) {

      const postdata = {
        body:'hgoihijhji', 
          todo: 'uhiuhuih',
          completed: false,
          userId: 5,           
      };
      var product = 'todos/add';
      this._baseRepository.request(product, 'POST', postdata).subscribe({
        next: (data:any) => {
          alert('success')
          console.log(data);
        },
      
      });

    } else {
      console.log('Form is invalid');
    
  };
};
getTodosById(userId: Number): void {
  debugger
  this._baseRepository.request<any>(`user/${userId}`, 'GET').subscribe({
    next: (data) => {
    this.TodoForm.patchValue({
    
      firstName: data.firstName,
     lastName: data.lastName,
      age: data.age,
      
    });
    },
}

)};













}