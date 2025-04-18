import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from './../../services/base.repository';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calculator',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  itemForm!: FormGroup;
  calculatorForm!: FormGroup;
  finalResult = 0;
  itemValue:string ='' ;
  students:any = [];
  firstdata=0;
  secondData=0;

  constructor(private baseRepository:BaseRepository){
  this.calculatorForm = new FormGroup({
    firstValue : new FormControl('',[Validators.required]),
    secondValue : new FormControl('',[Validators.required]),
    resultData: new FormControl('',[Validators.required]),
  })

  this.itemForm = new FormGroup({
    addItem : new FormControl('',[Validators.required]),
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

  saveItem(){
    this.itemValue = this.itemForm.value.addItem,
    this.students.push(this.itemValue);
    console.log(this.students)
  }

  clearInputsCalculator(){
    this.calculatorForm.reset();
    this.firstdata = 0;
    this.secondData = 0;
    this.finalResult = 0;
  }

}
