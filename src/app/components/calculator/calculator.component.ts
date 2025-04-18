import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from './../../services/base.repository';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculator',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  calculatorForm!: FormGroup;
  finalResult = 0;
  firstdata=0;
  secondData=0;

  constructor(private baseRepository:BaseRepository){
  this.calculatorForm = new FormGroup({
    firstValue : new FormControl('',[Validators.required]),
    secondValue : new FormControl('',[Validators.required]),
    resultData: new FormControl('',[Validators.required]),
  })


  }

  calculate(checkType:string){
    this.firstdata = this.calculatorForm.value.firstValue;
    this.secondData = this.calculatorForm.value.secondValue;

    if(checkType === 'addition'){
      this.finalResult = this.firstdata + this.secondData;
    }else if(checkType === 'minus'){
      this.finalResult = this.firstdata - this.secondData;
    }else if(checkType === 'multiply'){
      this.finalResult = this.firstdata * this.secondData;
    }else{
      this.finalResult = this.firstdata / this.secondData;
    }
    this.calculatorForm.patchValue({
      resultData: this.finalResult,


    });

  }

  clearInputs(){

  }

}
