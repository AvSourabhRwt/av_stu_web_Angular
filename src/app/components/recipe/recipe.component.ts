import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-recipe',
  imports: [CommonModule,RouterModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent implements OnInit {

  recipes: any[] = [];
  recipeDetail: any;
  recipeResponseData: any;
 
  recipe: any;
  indexID: Number = 0;
  modalInstance: any;

constructor(private baseRepository: BaseRepository,private   router :Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getRecipes();
  
  }
  getRecipes(): void {
    this.baseRepository.request<any[]>('recipes', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.recipeResponseData = data; // Bind data to the property
        console.log('Recipes fetched:', );
        this.recipes = this.recipeResponseData.recipes;
      },
      error: (err) => console.error('Error fetching recipes:', err)
    });
  }

  getRecipeById(recipeId: number): void {
    this.baseRepository.request<any>(`recipes/${recipeId}`, 'GET').subscribe({
      next: (data) => this.recipeDetail = data,
      error: (err) => console.error('Error fetching recipe:', err)
    });
    
  }
  EditresipeInfo(recipeId:Number){
    this.router.navigate(['/addrecipe'], { queryParams: { recipeId: recipeId} });

    
  }
  createUser(): void {
    const newUser = { name: 'John Doe', service: '' };
    this.baseRepository.request<any>('users', 'POST', newUser).subscribe({
      next: (data) => console.log('User created:', data),
      error: (err) => console.error('Error creating user:', err)
    });
  }



  dleterecipe(recipe: Number) {
    this.indexID = recipe;
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
    this.baseRepository.request(`recipes/${this.indexID}`, `DELETE`) .subscribe ({
      next: (data: any) => {
        console.log(data);
        alert('delete suceess')


      },


    });


  }


}



    
  

 
