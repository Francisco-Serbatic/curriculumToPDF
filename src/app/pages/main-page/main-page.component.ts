import { Component, OnInit, EventEmitter, Output, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Datos, DatosImpl } from "../../models/datos"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PdfCreatorService } from 'src/app/services/pdf-creator.service';
import { FormCardComponent } from 'src/app/components/form-card/form-card.component';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  myForm: FormGroup;
  formData: DatosImpl[] = [
    DatosImpl.crearDatos("Datos Personales", [
      'Consejo:',
      'Clan:',
      'Oficina:',
      'Puesto:',
      'Fecha de alta:'
    ], false),
    DatosImpl.crearDatos("Experiencia en Grupo VASS", [
      'Fecha de inicio:',
      'Fecha de fin:',
      'Puesto:',
      'Otro Puesto:',
      'Cliente:',
      'Proyecto:',
      'Descripción:'
    ],
      true
    ),
    DatosImpl.crearDatos("Formación Académica", [
      'Titulación:',
      'Tipo de titulación:',
      'Fecha de inicio:',
      'Fecha fin:',
      'Centro:'
    ],
      true
    ),
    DatosImpl.crearDatos("Datos Personales", [
      'Consejo:',
      'Clan:',
      'Oficina:',
      'Puesto:',
      'Fecha de alta:'
    ],
      false
    ),
  ]
  @ViewChildren ('coso') datosDesdeElPadre: QueryList<FormCardComponent>
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private fb: FormBuilder, private pdfGenerator: PdfCreatorService) { }

  // todo: Poner datos clave bien.

  enviarEvento() {
    this.datosDesdeElPadre.forEach((value, index) => {
      this.formData[index].responses = value.cositas();
    });
    this.mostrarDatos();
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: ['', Validators.required]
    });
  }

  mostrarDatos() {
    this.pdfGenerator.createpdf(this.formData);
    // this.pdfGenerator.createpdf1()
  }

}
