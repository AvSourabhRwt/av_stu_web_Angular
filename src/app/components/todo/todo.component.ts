import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-todo',
  imports: [CommonModule,RouterModule ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent implements OnInit {
  todos: any[] = [];
  todoDetail: any;
  todoResponseData: any;
  modalInstance: any;
  indexID: any;
  todoid: any;

  constructor(private baseRepository: BaseRepository,private   router :Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getTodos();
    //this.getTodosById(1);
    //this.createTodo();
  }
  getTodos(): void {
    this.baseRepository.request<any[]>('todos', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.todoResponseData = data; // Bind data to the property
        console.log('Todos fetched:', );
        this.todos = this.todoResponseData.todos;
      },
      error: (err) => console.error('Error fetching todos:', err)
    });
  }

  getTodosById(userId: Number): void {
    this.baseRepository.request<any>(`user/${userId}`, 'GET').subscribe({
      next: (data) => this.todoDetail = data,
      error: (err) => console.error('Error fetching todo:', err)
    });
  }

  createUser(): void {
    const newUser = { name: 'John Doe', email: 'mailto:john@example.com' };
    this.baseRepository.request<any>('users', 'POST', newUser).subscribe({
      next: (data) => console.log('User created:', data),
      error: (err) => console.error('Error creating user:', err)
    });
  }
  EdittodoInfo(userId:Number){
    debugger
   this.router.navigate(['/addtodo'], { queryParams: { userId:userId} });
  }



  
 dleteInfo(todoid: Number) {
      this.indexID = todoid;
      this.showModal();
  
  
    }
    showModal() {
      const modelShow = document.getElementById('exampleModalLabel')
      if (modelShow) {
  
        this.modalInstance = new Modal(modelShow);
        this.modalInstance.show();
      }
    }
    deletetodo() {
      this.baseRepository.request(`todos/${this.indexID}`, `DELETE`) .subscribe ({
        next: (data: any) => {
          console.log(data);
          alert('delete suceess')
  
  
        },
  
  
      });
  
  
    }
  
  
  }
  
