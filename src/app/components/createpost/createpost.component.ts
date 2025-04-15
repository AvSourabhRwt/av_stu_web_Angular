import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createpost',
  imports: [ReactiveFormsModule ,RouterModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css'
})



export class CreatepostComponent {
  postId: string | null = null;
 userPostForm: FormGroup;

  constructor(private _baseRepository: BaseRepository ,private activatedRoute:ActivatedRoute) {

    this.userPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),

    });
    debugger;
    this.activatedRoute.queryParams.subscribe(params => {
      this.postId  = params['postId']; // ✅ Get query param
      this.GetPostById(Number(this.postId));
    });
    
  }
  
  

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    
    if (this.userPostForm.valid) {
      const postdata = {
        title: this.userPostForm.value.title,
        userId:5,
       // body: this.LginpostForm.value.body,   
      //  author: "Default Author",             
      };
      var product = 'posts/add';
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
  GetPostById(postId: number): void {
    this._baseRepository.request<any>(`posts/${postId}`, 'GET').subscribe({
      next: (data) => {
      this.userPostForm.patchValue({
        title:data.title,
        userId: data.userId,
      });
      },
}

)};



} 
