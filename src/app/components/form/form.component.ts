import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  loaded: boolean = false;
  cvForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.cvForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      surname1: ["", Validators.required],
      surname2: ["", Validators.required],
      board: ["", Validators.required],
      clan: ["", Validators.required],
      office: ["", Validators.required],
      position: ["", Validators.required],
      professionalStart: ["", Validators.required],
      vassSection: this.formBuilder.array([]),
      degree: ["", Validators.required],
      typeDegree: ["", Validators.required],
      academicStart: ["", Validators.required],
      academicEnd: ["", Validators.required],
      institution: ["", Validators.required],
      languages: ["", Validators.required],
      skills: ["", Validators.required],
      certifications: ["", Validators.required]
    });

    this.addVassSection();

    this.loaded = true;
  }

  get sectionArray(): FormArray {
    return this.cvForm.get('vassSection') as FormArray;
  }

  addVassSection() {
    const section = this.formBuilder.group({
      vassStart: ["", Validators.required],
      vassEnd: ["", Validators.required],
      vassPossition: ["", Validators.required],
      vassOtherPossition: ["", Validators.required],
      client: ["", Validators.required],
      project: ["", Validators.required],
      description: ["", Validators.required],
    });

    this.sectionArray.push(section);
  }

  removeVassSection(index: number) {
    this.sectionArray.removeAt(index);
  }

  exportToPDF() {
    console.log(this.cvForm.value);
  }
}