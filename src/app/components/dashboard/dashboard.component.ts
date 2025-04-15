import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  userDetail: any;
  userResponseData: any;

  // isLoggedIn:boolean=false;
  constructor(private baseRepository:BaseRepository,private router: Router)
  {
    
  }


  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.baseRepository.request<any[]>('users', 'GET').subscribe({
      next: (data) => {
        console.log('Users fetched:', );
        this.users = this.userResponseData.users;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  getUserById(userId: number): void {
    this.baseRepository.request<any>(`users/${userId}`, 'GET').subscribe({
      next: (data) => this.userDetail = data,
      error: (err) => console.error('Error fetching user:', err)
    });
  }

  createUser(): void {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    this.baseRepository.request<any>('users', 'POST', newUser).subscribe({
      next: (data) => console.log('User created:', data),
      error: (err) => console.error('Error creating user:', err)
    });
  }
}