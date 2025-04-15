import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-contactlist',
  imports: [CommonModule,RouterModule],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent {
  users: any;
  usersDetail: any;

contact: any;
 

constructor(private baseRepository: BaseRepository,private   router :Router,private activatedRoute:ActivatedRoute) {}


  ngOnInit() {
    this.getContacts()
  }

  getContacts(){
    debugger
    this.baseRepository.request('users', 'GET').subscribe({
      next: (data:any) => {
        this.usersDetail = data.users; // Bind data to the property
        debugger
        console.log(this.usersDetail)
      },
      error: (err) => console.error('Error fetching recipes:', err)
    });
  }

  getusersById(usersId: Number): void {
    debugger
    this.baseRepository.request<any>(`users/${usersId}`, 'GET').subscribe({
      next: (data) => this.usersDetail = data,
      error: (err) => console.error('Error fetching users:', err)
    });
    
  }

  EditcontactInfo(usersId:Number){
    debugger
   this.router.navigate(['/contactus'], { queryParams: { usersId:usersId} });
  }

 

}
