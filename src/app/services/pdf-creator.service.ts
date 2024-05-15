import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatosImpl } from '../models/datos';
import { Table } from '../models/table';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() { }

  // todo: Poner en tabla para que se vea decente

  createpdf(arrayData: DatosImpl[]) {
    var content: any = []

    arrayData.forEach((datosImpl) => {
      var table = new Table();
      content.push(this.generatePdfText(datosImpl.header, "header"))

      datosImpl.responses.forEach((response, index) => {
        let row = []
        let titleIndex = index;
        while (titleIndex >= datosImpl.titles.length) {
          titleIndex = titleIndex - datosImpl.titles.length;
        }
        row.push(this.generatePdfText(datosImpl.titles[titleIndex], "catalog"));
        row.push(this.generatePdfText(response, "text"))
        table.body.push(row)
      })
      content.push({table, layout: 'noBorders'})
      content.push({ text: " " })
    })
    console.log(content)


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

  private generatePdfText(text: string, style: string): any {
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
              [{ text: "ojete", style: "ojal" }, "hola", "ashdosda"],
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
