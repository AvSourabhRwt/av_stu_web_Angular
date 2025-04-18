import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: any[] = [];
  userDetail: any;
  userResponseData: any;
  updateclass:boolean=true; 
  modalInstance: any;
  indexID: Number=0;

  constructor(private baseRepository:BaseRepository,private router: Router)
  {
    
  }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.baseRepository.request<any[]>('users', 'GET').subscribe({
      next: (data:any) => {
        this.users = data.users;
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


  EditUserInfo(userId:number){
    this.router.navigate(['/adduser'], { queryParams: { userId: userId} });
  }

  createUser(): void {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    this.baseRepository.request<any>('users', 'POST', newUser).subscribe({
      next: (data) => console.log('User created:', data),
      error: (err) => console.error('Error creating user:', err)
    });
  }

  
    
  dleteuser(userid: Number) {
        this.indexID = userid;
        this.showModal();
    
    
      }
      showModal() {
        const modelShow = document.getElementById('exampleModalLabel')
        if (modelShow) {
    
          this.modalInstance = new Modal(modelShow);
          this.modalInstance.show();
        }
      }
      deleteuser() {
        this.baseRepository.request(`users/${this.indexID}`, `DELETE`) .subscribe ({
          next: (data: any) => {
            console.log(data);
            alert('delete suceess')
    
    
          },
    
    
        });
    
    
      }
 
      
      toggleClass(){
        // if(this.updateclass == true){
        //   this.updateclass = false;
        // }else{
        //   this.updateclass = true;
        // }

        // this.updateclass == true ? this.updateclass= false : this.updateclass = true;

        this.updateclass = !this.updateclass;
      }
    
}
    
  
