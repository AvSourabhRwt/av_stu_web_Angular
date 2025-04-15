import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { RouterModule,Router, ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-post',
  imports: [CommonModule,RouterModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
user: any;
title: any;
  
 
  posts: any[] = [];
  postDetail: any;
  postResponseData: any;
  userDetail: any;
  postid: any;
  UserpostForm: any;
  indexID: any;
  modalInstance: any;

  constructor(private baseRepository: BaseRepository,private router: Router, private activatedRoute:ActivatedRoute)
   {

    this.activatedRoute.queryParams.subscribe(params => {
      this.postid  = params['postid']; 
      this.getUserById(Number(this.postid));
    });
  }
  getUserById(arg0: number) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getPosts();

  }
  getPosts(): void {
    this.baseRepository.request<any[]>('posts', 'GET').subscribe({
      next: (data: any) => {
        debugger;
        this.postResponseData = data; // Bind data to the property
        console.log('Posts fetched:', );
        this.posts = this.postResponseData.posts;
      },
      error: (err: any) => console.error('Error fetching posts:', err)
    });
  }

  getPostById(postid: number): void {
    this.baseRepository.request<any>(`users/${postid}`, 'GET').subscribe({
      next: (data) => {
      this.UserpostForm.patchValue({
       
      });
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }


  
  EditPostInfo(postid:number){
  
    this.router.navigate(['/createpost'], { queryParams: { postId:postid} });
  }
 

  createPost(): void {
    const newPost = { title: 'John Doe', body: 'Ready for night , cuz ther is no guarantee of morning' };
    this.baseRepository.request<any>('posts', 'POST', newPost).subscribe({
      next: (data: any) => console.log('Post created:', data),
     
    });
  }

  dleteInfo(postId: Number) {
      this.indexID = postId;
      this.showModal();
  
  
    }
    showModal() {
      const modelShow = document.getElementById('exampleModalLabel')
      if (modelShow) {
  
        this.modalInstance = new Modal(modelShow);
        this.modalInstance.show();
      }
    }
    deleteCmt() {
      this.baseRepository.request(`posts/${this.indexID}`,'DELETE').subscribe({
        next: (data: any) => {
          console.log(data);
          alert('delete suceess')
  
  
        },
  
  
      });
  
  
    }
  
  
  }
  


function getUserById(postid: any, number: any) {
    throw new Error('Function not implemented.');
  }
function getPostById(postid: any, number: any) {
  throw new Error('Function not implemented.');
}

