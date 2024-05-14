import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatosImpl } from '../models/datos';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() { }

  createpdf(arrayData: DatosImpl[]) {
    var content: any[] = []
    arrayData.forEach((datosImpl) => {
      content.push(this.createContentObject(datosImpl.title, "header"))
      datosImpl.responses.forEach((response, index) => {
        let titleIndex = index;
        while (titleIndex >= datosImpl.data.length) {
          titleIndex = titleIndex - datosImpl.data.length;
        }
        content.push(this.createContentObject(datosImpl.data[titleIndex], "catalog"));
        content.push(this.createContentObject(response, "text"));
      })
      content.push(" ", " ")
    })

    const pdfDefinition: any = {
      content: content,
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        catalog: {
          fontSize: 14,
          bold: true
        },
        text: {
          fontSize: 12,
          bold: true
        }
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  private createContentObject(text: string, style: string): any {
    return {
      text: text, style: style
    }
  }

  createpdf1() {
    const pdfDefinition: any = {
      content: [
        {
          table: {
            body: [
              ["hola", "hola", "ashdosda"],
              ["hola", "hola", "ashdosda"],
              ["hola", "hola", "ashdosda"],
              ["hola", "hola", "ashdosda"],
              ["hola", "hola", "ashdosda"],

            ]
          }
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
