import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatosImpl } from '../models/datos';
import { Table } from '../models/table';
import { ImageService } from './image.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor(private imageService: ImageService) { }


  // createpdf(arrayData: DatosImpl[]) {
  //   const imageUrl = '../../assets/serbatic.png';
  //   var content: any = []
  //   var header: any;

  //   arrayData.forEach((datosImpl, index) => {
  //     if (index != 0) {

  //       var table = new Table();
  //       table.widths = [160, '*', '*']
  //       let row = []
  //       row.push(this.generatePdfHeader(datosImpl.header, "header", datosImpl.titles.length))

  //       datosImpl.responses.forEach((response, index) => {
  //         let titleIndex = index;
  //         if (titleIndex >= datosImpl.titles.length && (datosImpl.responses.length) % index == 0) {
  //           row.push(' ')
  //           row.push('');
  //           row.push('');
  //           table.body.push(row);
  //           row = []
  //         }
  //         while (titleIndex >= datosImpl.titles.length) {
  //           titleIndex = titleIndex - datosImpl.titles.length;
  //         }
  //         if (index != 0)
  //           row.push('')
  //         row.push(this.generatePdfText(datosImpl.titles[titleIndex], "catalog"));
  //         row.push(this.generatePdfText(response, "text"));
  //         table.body.push(row);
  //         row = [];
  //       })
  //       content.push({ table, layout: 'noBorders' })
  //       content.push({ text: " " })

  //     } else {
  //       header = {
  //         alignment: 'justify',
  //         columns: [
  //           {
  //             image: 'data:image/png;base64,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',
  //             width: 150
  //           },
  //           {
  //             text: "Buenos dias caballero",
  //             style: 'name'
  //           }
  //         ]
  //       }
  //     }
  //   })

  //   console.log(header);
  //   console.log(content)
  //   const pdfDefinition: any = {
  //     header: header,
  //     content: content,
  //     styles: {
  //       header: {
  //         fontSize: 22,
  //         bold: true
  //       },
  //       catalog: {
  //         fontSize: 14,
  //         bold: true
  //       },
  //       text: {
  //         fontSize: 12,
  //         bold: true
  //       }
  //     }
  //   }

  //   console.log(pdfDefinition)

  //   const pdf = pdfMake.createPdf(pdfDefinition);
  //   pdf.open();
  // }

  createpdf(arrayData: DatosImpl[]) {
    const imageUrl = '../../assets/serbatic.png';
    var content: any = []
    var pdfHeader: any;

    arrayData.forEach((datosImpl, index) => {
      if (index != 0) {
        var table = new Table();
        let row = []

        table.widths = [160, '*', '*']

        if (datosImpl.responses.length > 0) {
          row.push(this.generatePdfHeader(datosImpl.header, "header", datosImpl.titles.length))
          datosImpl.responses.forEach((response, index) => {
            let titleIndex = index;

            if (titleIndex >= datosImpl.titles.length && datosImpl.titles.length % index == 0) {
              row.push(' ')
              row.push('');
              row.push('');
              table.body.push(row);
              row = []
            }
            while (titleIndex >= datosImpl.titles.length) {
              titleIndex = titleIndex - datosImpl.titles.length;
            }
            if (index != 0) {
              row.push('')
            }
            row.push(this.generatePdfText(datosImpl.titles[titleIndex], "catalog"));
            row.push(this.generatePdfText(response, "text"));
            table.body.push(row);
            row = [];
          })
        } 
        else {
          row.push(this.generatePdfHeader(datosImpl.header, "header", 1))
          row.push('');
          row.push('');
          table.body.push(row);
          row = [];
        }



        content.push({ table, layout: 'noBorders' })
        content.push({ text: " " })

      } else {
        pdfHeader = {
          alignment: 'justify',
          columns: [
            {
              image: 'data:image/png;base64,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',
              width: 150
            },
            {
              text: "Buenos dias caballero",
              style: 'name'
            }
          ]
        }
      }
    })

    const pdfDefinition: any = {
      header: pdfHeader,
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

  private generatePdfHeader(text: string, style: string, rowSpan: number): any {
    return {
      text: text, style: style, rowSpan: rowSpan
    }
  }

  private generatePdfText(text: string, style: string): any {
    return {
      text: text, style: style
    }
  }

}
