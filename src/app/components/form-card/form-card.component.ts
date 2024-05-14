import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, MaxValidator } from '@angular/forms';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  myForm: FormGroup;
  @Input() titles: string = "";
  @Input() formData: string[] = [];
  @Input() responses: string[] = [];
  @Input() ampliable: boolean = false;
  @Input() eventoPdf: boolean = false;

  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.setInputs();
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  setInputs() {
    for (let form in this.formData)
      {
        this.addNewInput()
      }
  }

  addNewInput() {
    var inputsArray = (this.myForm.get('groupArray') as FormArray);
    const newGroup = new FormGroup({
      input: new FormControl('')
    });
    inputsArray.push(newGroup);
  }

  public cositas(): string[] {
    const formDataArray: string[] = (this.myForm.get('groupArray') as FormArray).value.map((item: any) => item.input);
    // this.responses.forEach((data, index) => {
    //   formDataArray.push(this.groupArrayControls[index].value);
    // });
    return formDataArray
  }

  updateFormDataArray() {
    const formDataArray: string[] = (this.myForm.get('groupArray') as FormArray).value.map((item: any) => item.input);
    this.responses = [];
    this.responses.forEach((data, index) => {
      formDataArray.push(this.groupArrayControls[index].value);
    });
    this.responses = formDataArray;
  }

  ubicator(index: number): number {
    const maxNumber = this.formData.length;
    while (index>=maxNumber)
      {
        index = index - maxNumber;
      }
    return index
  }
  
}
