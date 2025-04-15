import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { BaseRepository } from '../../services/base.repository';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';



@Component({
  selector: 'app-addrecipe',
  imports: [ReactiveFormsModule],
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.css'
})
export class AddrecipeComponent {
  AddtForm: FormGroup;


  recipeId: any;

  constructor(private _baseRepository: BaseRepository, private activatedRoute: ActivatedRoute) {
    this.AddtForm = new FormGroup({
      ingredients: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.recipeId = params['recipeId']; // ✅ Get query param
      this.getRecipeById(this.recipeId);
    });
  }


  ngOnInit(): void {

  }

  onSubmit(): void {
    debugger

    if (this.AddtForm.valid) {
      const postdata = {
        body: 'akjshjih',
        name: 'Tasty Pizza'
      };
      var product = 'recipes/add';
      this._baseRepository.request(product, 'POST', postdata).subscribe({
        next: (data: any) => {
          alert('success')
          console.log(data);
        },

      });
    } else {
      console.log('Form is invalid');
    }
  }
  getRecipeById(recipeId: Number): void {
    debugger
    this._baseRepository.request<any>(`recipe/${recipeId}`, 'GET').subscribe({
      next: (data) => {
        this.AddtForm.patchValue({
          ingredients: data.ingredients,
          name: data.name,

        });
      },
    }

    )
  };


}










