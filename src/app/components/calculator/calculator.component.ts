import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseRepository } from './../../services/base.repository';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calculator',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  [x: string]: any;
  itemForm!: FormGroup;
  calculatorForm!: FormGroup;
  resultForm!: FormGroup;
  addForm!: FormGroup;
  finalResult = 0;
  itemValue: string = '';
  addvalue: string = '';
  students: any = [];
  firstdata = 0;
  secondData = 0;
  studentss: any = [];
  name: any;
  firstResultdata = 0;
  secondResultdata = 0;
  thirdResultdata = 0;
  studentGetmarks = 0;
  totalMarks = 300;
  percentage = 0;
  grade: string = ''

  constructor(private baseRepository: BaseRepository) {
    this.resultForm = new FormGroup({
      firstMarks: new FormControl('', [Validators.required]),
      secondMarks: new FormControl('', [Validators.required]),
      thirdMarks: new FormControl('', [Validators.required]),
      finalMarks: new FormControl('', [Validators.required]),

    })






    this.calculatorForm = new FormGroup({
      firstValue: new FormControl('', [Validators.required]),
      secondValue: new FormControl('', [Validators.required]),
      resultData: new FormControl('', [Validators.required]),
    })

    this.itemForm = new FormGroup({
      addItem: new FormControl('', [Validators.required]),
    })

    this.addForm = new FormGroup({
      addname: new FormControl('', [Validators.required])


    })

  }

  deleteData(data: string) {
    const index = this.students.indexOf(data);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
    console.log(data)
  }

  calculate(checkType: string) {
    this.firstdata = this.calculatorForm.value.firstValue;
    this.secondData = this.calculatorForm.value.secondValue;

    if (checkType === 'addition') {
      this.finalResult = this.firstdata + this.secondData;
    } else if (checkType === 'minus') {
      this.finalResult = this.firstdata - this.secondData;
    } else if (checkType === 'multiply') {
      this.finalResult = this.firstdata * this.secondData;
    } else {
      this.finalResult = this.firstdata / this.secondData;
    }
    this.calculatorForm.patchValue({
      resultData: this.finalResult,
    });

  }

  saveItem() {
    this.itemValue = this.itemForm.value.addItem,
      this.students.push(this.itemValue);
    console.log(this.students)
    this.clearItemForm()
  }
  DeletStudent(indexdata: string) {
    debugger
    const index = this.students.indexOf(indexdata)
    if (index !== -1) {
      this.students.splice(index, 1)
    }

  }

  clearInputsCalculator() {
    this.calculatorForm.reset();
    this.firstdata = 0;
    this.secondData = 0;
    this.finalResult = 0;
  }

  clearItemForm() {
    this.itemForm.reset();
    this.itemValue = '';
  }

  getmarks() {
    this.firstResultdata = this.resultForm.value.firstMarks;
    this.secondResultdata = this.resultForm.value.secondMarks;
    this.thirdResultdata = this.resultForm.value.thirdMarks;
    {

      this.studentGetmarks = this.firstResultdata + this.secondResultdata + this.thirdResultdata;
      this.percentage = (this.studentGetmarks / 300) * 100;

      if (this.percentage >= 99) {
        this.grade = 'O';
      }
      else if (this.percentage >= 90) {
        this.grade = 'A+ ghr diaan ne O grade waale naal commparisson krna ae';
      } else if (this.percentage >= 80) {
        this.grade = 'A, Topper naal baithan da faida hoo gia ';
      } else if (this.percentage >= 70) {
        this.grade = 'B+, Ine marks kiwe aa gye mere';
      }else if (this.percentage >= 60) {
        this.grade = 'B, bina pdee paas ho gia';
      }else if (this.percentage >= 45) {
        this.grade = 'C, D aaun toh taan changa hi aa';
      }else if (this.percentage >= 33) {
        this.grade = 'D, Aukha hi paas hoiya';
      }else {
        this.grade = 'F, Fitay muh nakal Mar ke v tangia gia';
      }
    this.resultForm.patchValue({
      finalMarks: this.studentGetmarks,
    });
  }
}
    
 

}
