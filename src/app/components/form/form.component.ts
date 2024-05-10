import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    const sectionArrayValues = this.sectionArray.getRawValue();

    const pdfDefinition: any = {
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "serbatic",
              style: 'header'
            },
            {
              text: this.cvForm.get('firstName').value + " " + this.cvForm.get('surname1').value + " " + this.cvForm.get('surname2').value + " " + " V1 - Developer"
            }
          ]
        },
        '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Datos Profesionales",
              style: 'header'
            },
            {
              text: 'Consejo: ' + this.cvForm.get('board').value +
                '\nClan: ' + this.cvForm.get('clan').value +
                '\nOficina: ' + this.cvForm.get('office').value +
                '\nPuesto: ' + this.cvForm.get('position').value +
                '\nFecha de alta: ' + this.cvForm.get('professionalStart').value
            }
          ]
        },
        '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Experiencia en grupo VASS",
              style: 'header'
            },
            {
              stack: sectionArrayValues.map((item: any) => {
                return [
                  'Fecha de inicio: ' + item.vassStart,
                  'Fecha de fin: ' + item.vassEnd,
                  'Puesto: ' + item.vassPossition,
                  'Otro Puesto: ' + item.vassOtherPossition,
                  'Cliente: ' + item.client,
                  'Proyecto: ' + item.project,
                  'Descripción:' + item.description,
                  "\n"
                ];
              })
            }
          ]
        }, '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Formación académica",
              style: 'header'
            },
            {
              text: 'Titulación: ' + this.cvForm.get('degree').value +
                '\nTipo de titulación: ' + this.cvForm.get('typeDegree').value +
                '\nFecha de inicio: ' + this.cvForm.get('academicStart').value +
                '\nFecha fin: ' + this.cvForm.get('academicEnd').value +
                '\nCentro: ' + this.cvForm.get('institution').value
            }
          ]
        }, '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Idiomas",
              style: 'header'
            },
            {
              text: this.cvForm.get('languages').value
            }
          ]
        }, '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Conocimientos tecnológicos",
              style: 'header'
            },
            {
              text: this.cvForm.get('skills').value
            }
          ]
        }, '\n',
        {
          alignment: 'justify',
          columns: [
            {
              width: 150,
              text: "Certificaciones",
              style: 'header'
            },
            {
              text: this.cvForm.get('certifications').value
            }
          ]
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);

    pdf.open();
  }
}