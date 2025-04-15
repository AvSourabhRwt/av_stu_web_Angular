import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-quote',
  imports: [CommonModule,RouterModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})

export class QuoteComponent implements OnInit {
  quotes: any[] = [];
  quoteDetail: any;
  quoteResponseData: any;
  modalInstance: any;
  indexID: Number = 0;


  constructor(private baseRepository: BaseRepository,private router: Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getQuotes();
    //this.getQuoteById(1);
    //this.createQuote();
  }
  getQuotes(): void {
    this.baseRepository.request<any[]>('quotes', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.quoteResponseData = data; // Bind data to the property
        console.log('Quotes fetched:', );
        this.quotes = this.quoteResponseData.quotes;
      },
      error: (err) => console.error('Error fetching quotes:', err)
    });
  }

  getQuoteById(quoteId: Number): void {
    this.baseRepository.request<any>(`quotes/${quoteId}`, 'GET').subscribe({
      next: (data) => this.quoteDetail = data,
      error: (err) => console.error('Error fetching quote:', err)
    });
  }
      EditquoteInfo(quoteId:Number){
  
    this.router.navigate(['/addquote'], { queryParams: { quoteId:quoteId} });
  }
 
  
createUser(): void {
    const newUser = { author: 'John Doe', email: 'mailto:john@example.com' };
    this.baseRepository.request<any>('users', 'POST', newUser).subscribe({
      next: (data) => console.log('User created:', data),
      error: (err) => console.error('Error creating user:', err)
    })
  }
  
  dletequote(quoteId: Number) {
          this.indexID = quoteId;
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
          this.baseRepository.request(`quotes/${this.indexID}`,`DELETE`).subscribe({
            next: (data: any) => {
              console.log(data);
              alert('delete suceess')
      
      
            },
      
      
          });
      
      
        }
      
      
      }


function EditquoteInfo(quoteid: any, Number: NumberConstructor) {
  throw new Error('Function not implemented.');
}

