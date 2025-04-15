import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { RouterModule,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addquote',
  imports: [ReactiveFormsModule,RouterModule ],
  templateUrl: './addquote.component.html',
  styleUrl: './addquote.component.css'
})
export class AddquoteComponent {
 
  QuoteForm: FormGroup;
  quoteId: any;
  constructor(private _baseRepository: BaseRepository ,private activatedRoute:ActivatedRoute) {


 this.QuoteForm = new FormGroup({

  userId: new FormControl('', [Validators.required]),
  body: new FormControl('', [Validators.required]),
  tags: new FormControl('', [Validators.required]),

});
debugger;
this.activatedRoute.queryParams.subscribe(params => {
  this.quoteId  = params['quoteId']; // ✅ Get query param
   this.GetQuoteById(Number(this.quoteId));
});

  }

onSubmit(): void {
    
  
}
  
GetQuoteById(quoteId:Number): void {
  debugger
  this._baseRepository.request<any>(`posts/${quoteId}`, 'GET').subscribe({
    next: (data) => {
    this.QuoteForm.patchValue({
     
      userId: data.userId,
      body: data.body,
      tags: data.tags,
     
      
    
     

    });
    },
}

)};



} 