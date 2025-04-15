import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-addcart',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './addcart.component.html',
  styleUrl: './addcart.component.css'
})
export class AddcartComponent {
  [x: string]: any;
  cartId:any;
  modalInstance: Modal | undefined;
  cartForm!: FormGroup;

  constructor(private _baseRepository: BaseRepository,private activatedRoute:ActivatedRoute ) {
    
 this.cartForm = new FormGroup({

  userId: new FormControl('', [Validators.required]),
  total: new FormControl('', [Validators.required]),
  totalQuantity: new FormControl('', [Validators.required]),
     
    });
    this.activatedRoute.queryParams.subscribe(params => {
      debugger;
      this.cartId  = params['cartId']; 
      this.getCartById(Number(this.cartId));
    });
  
 
  }
 
  ngOnInit(): void {
    
  }

  addCart(){
    debugger
    const postdata={
      userId: 1,
      products: [
        {
          id: 144,
          quantity: 4,
        },
        {
          id: 98,
          quantity: 1,
        },
      ]
    }

   
      var carturl = 'carts/add';
      this._baseRepository.request(carturl  , 'POST',postdata).subscribe({
        next: (data:any) => {
          alert('success')
          console.log(data);
        },
        error:(err)=>{
          this.errorMessage('no data')
        }
      
      });
    } 
  errorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  getCartById(cartId: Number): void {
    debugger
    this._baseRepository.request<any>(`carts/${this.cartId}`, 'GET').subscribe({
      next: (data) => {
      this.cartForm.patchValue({
     
        userId:data.userId,
        total: data.total,
        totalQuantity: data.totalQuantity,
       
      });
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }


  

}









