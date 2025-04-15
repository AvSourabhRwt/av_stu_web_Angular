import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addcomment',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './addcomment.component.html',
  styleUrl: './addcomment.component.css'
})
export class AddcommentComponent {


  commentForm: FormGroup;
  postId: any;
  commentId: any;


  constructor(private _baseRepository: BaseRepository ,private activatedRoute:ActivatedRoute){

    this.commentForm = new FormGroup({
      body: new FormControl('', [Validators.required]),
      postId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required])

    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.commentId  = params['commentId']; // ✅ Get query param
      this.getCommentById(Number(this.commentId));
    });
    
  }
 
  ngOnInit(): void {

  }

  onSubmit(): void {
    debugger


    if (this.commentForm.valid) {
      const postdata = {
        body:"kjhjk",
        userId: 5,
        postId: 3,

      };
      var product = 'comments/add';
      this._baseRepository.request(product, 'POST', postdata).subscribe({
        next: (data: any) => {
          alert('success')
          console.log(data);
        },
      });

    } else {
      console.log('Form is invalid');
    };
  };


getCommentById(commentId: number): void {
  this._baseRepository.request<any>(`comments/${commentId}`, 'GET').subscribe({
    next: (data) => {
    this.commentForm.patchValue({
      userId:data.id,
      postId: data.likes,
      body: data.body,
    });
    },
}

)};


}
