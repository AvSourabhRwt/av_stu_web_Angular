import { Component, OnInit } from '@angular/core';
import { BaseRepository } from '../../services/base.repository';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  implements OnInit {
  postResponseData: any;
  products: any;
  productsResponseData: any;


  constructor(private baseRepository: BaseRepository,private   router :Router,private activatedRoute:ActivatedRoute){}


  ngOnInit(): void {
    this.getproductss();

  }
  getproductss(): void {
    this.baseRepository.request<any[]>('products', 'GET').subscribe({
      next: (data: any) => {
        debugger;
        this.productsResponseData = data.products; 
        console.log('products fetched:' );
      },
      error: (err: any) => console.error('Error fetching posts:', err)
    });
  }
  EditproductInfo(indexId:Number){
    this.router.navigate(['/addproducts'], { queryParams: { indexId: indexId} });

    

  }
}