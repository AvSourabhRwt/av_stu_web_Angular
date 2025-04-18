import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared.imports';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, RouterModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent implements OnInit {
  comments: any[] = [];
  commentDetail: any;
  commentResponseData: any;
  rocsID: Number = 0;
  customColor: string = 'Red';

  commentId: any;
  comment: any;


  modalInstance !: Modal;

  constructor(private baseRepository: BaseRepository, private router: Router, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.commentId = params['commentId'];
      this.getCommentById(Number(this.commentId));
    });
  }

  ngOnInit(): void {
    this.getComments();
    //this.getCommentById(1);
    //this.createComment();
  }
  getComments(): void {
    this.baseRepository.request<any[]>('comments', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.commentResponseData = data; // Bind data to the property
        console.log('Comments fetched:',);
        this.comments = this.commentResponseData.comments;
      },

    });
  }

  getCommentById(commentId: number): void {
    this.baseRepository.request<any>(`comments/${commentId}`, 'GET').subscribe({
      next: (data) => this.commentDetail = data,
      error: (err) => console.error('Error fetching comment:', err)
    });
  }
  EditcommentInfo(commentId: number) {

    this.router.navigate(['/addcomment'], { queryParams: { commentId: commentId } });
  }

  createComment(): void {
    const newComment = { Body: 'the night of death', likes: '10' };
    this.baseRepository.request<any>('comments', 'POST', newComment).subscribe({
      next: (data) => console.log('Comment created:', data),
      error: (err) => console.error('Error creating comment:', err)
    });
  }

  dleteInfo(commentId: Number) {
    this.rocsID = this.commentId;
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
    this.baseRepository.request(`comments ${this.rocsID}`, `DELETE`).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('delete suceess')


      },


    });


  }
  CustomColorDiv(divCol: string) {
    this.customColor = divCol;
  }

}
