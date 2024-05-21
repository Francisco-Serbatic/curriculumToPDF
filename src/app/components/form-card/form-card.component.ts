import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, MaxValidator, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  myForm: FormGroup;
  inputsGroup: FormGroup;

  @Input() header: string = "";
  @Input() titles: string[] = [];
  @Input() ampliable: boolean = false;

  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      groupArray: this.formBuilder.array([])
    });
    this.inputsGroup = this.createForm();
    this.addFormGroup();
  }

  getDeleteBtnColspan(): number {
    return (this.titles.length%2 == 0) ? 2 : 1;
  }

  addFormGroup() {
    const newFormGroup = this.createForm();
    this.groupArray.push(newFormGroup);
  }

  deleteFormGroup(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((close) => {
      if (close)
        this.groupArray.removeAt(index)
    });
  }

  createForm(): FormGroup {
    const group = {};
    this.titles.forEach((field, index) => {
      group[field] = ['', Validators.required];
    });
    return this.formBuilder.group(group);
  }

  getFormGroupControls() {
    return Object.keys(this.inputsGroup.controls);
  }

  public getFormData(): string[] {
    //console.log(((this.myForm.get('groupArray') as FormArray).controls as FormGroup[])[0].controls)
    const formDataArray: string[] = [];
    (this.myForm.get('groupArray') as FormArray).controls.map((group: AbstractControl) => {
      const formGroup = group as FormGroup;
      Object.keys(formGroup.controls).forEach(key => {
        formDataArray.push(formGroup.get(key)?.value)
      });
     
    });
    return formDataArray;
    
  }

  get groupArray(): FormArray {
    return this.myForm.get('groupArray') as FormArray;
  }
  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

}
