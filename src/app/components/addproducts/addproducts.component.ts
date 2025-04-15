import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addproducts',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.css'
})
export class AddproductsComponent {
  productForm!: FormGroup; 
  indexId: any;
  

  constructor(private _baseRepository: BaseRepository , private activatedRoute : ActivatedRoute){
    this.productForm = new FormGroup({
     
      title: new FormControl('', [Validators.required]),
     
    });
    this.activatedRoute.queryParams.subscribe(params => {
      debugger; 
      this.indexId = params['indexId']; // ✅ Get query param
      this.getproductById(Number(this.indexId));
    });
  }
  
  ngOnInit() {

  }


  SavePost(){
    debugger

    if(this.productForm.valid) {
      const postdata = {
       title: 'mlkjk'
      }
    
      var productUrl = 'products/add';
      this._baseRepository.request(productUrl, 'POST', postdata).subscribe({
        next: (data: any) => {
          alert('success')
          console.log(data);
        },
      });
    
    
    } 
    else  {
        console.log('Form is invalid');
      };
  }
  getproductById(indexId: Number): void {
    debugger
    this._baseRepository.request<any>(`products/${indexId}`, 'GET').subscribe({
      next: (data) => {
        this.productForm.patchValue({
          title: data.title,
         
         
         

        });
      },
    })

    
  };


}

