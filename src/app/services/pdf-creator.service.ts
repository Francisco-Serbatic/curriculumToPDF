import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatosImpl } from '../models/datos';
import { Table } from '../models/table';
import { ImageService } from './image.service';
import { longString } from '../models/base64Image';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor(private imageService: ImageService) { }

  
  createpdf(arrayData: DatosImpl[]) {
    const imageUrl = '../../assets/serbatic.png';
    var content: any = [];
    var pdfHeader: any = {};
    const pdfFooter: any = this.generatePdfFooter()

    arrayData.forEach((datosImpl, index) => {
      if (index != 0) {
        var columns: any[] = []
        var table = new Table();
        let row = []

        table.widths = [160, 120, '*']

        if (datosImpl.responses.length > 0) {
          row.push(this.generatePdfSection(datosImpl.header, "section", datosImpl.titles.length))
          datosImpl.responses.forEach((response, index) => {
            let titleIndex = index;

            if (titleIndex >= datosImpl.titles.length && datosImpl.titles.length % index == 0) {
              row.push(' ')
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
            var fillColor = ""
            if (index%2==0) {
              fillColor = "#f9f9f7"
            }
            row.push(this.generatePdfText(datosImpl.titles[titleIndex], "title", fillColor));
            row.push(this.generatePdfText(response, "text", fillColor));
            table.body.push(row);
            row = [];
          })
        }
        else {
          row.push(this.generatePdfSection(datosImpl.header, "section", 1))
          row.push('');
          row.push('');
          console.log()
          table.body.push(row);
          row = [];
        }



        content.push({ table, layout: 'noBorders' })
        content.push({ text: " " })

      } else {
        pdfHeader = this.generatePdfHeader(datosImpl.responses[0], datosImpl.responses[1], datosImpl.responses[2])
      }
    })

    const pdfDefinition: any = {
      header: pdfHeader,
      content: content,
      footer: pdfFooter,
      styles: {
        headerClass: {
          fontSize: 25,
          bold: true,
          alignment: 'left',
          color: '#5f5f5f',
          width: '*',
          margin: [15, 0, 5, 0]
        },
        header: {
          fontSize: 30,
          bold: true,
          alignment: 'left',
          width: '*',
          margin: [15, 0, 5, 0]
        },
        section: {
          fontSize: 18,
          alignment: "right",
          bold: true,
          color: '#86ccb3',
          margin: [5, 0, 15, 0]
        },
        text: {
          fontSize: 11
        },
        title: {
          fontSize: 12,
          alignment: "left",
          bold: true
        },
        footer: {
          fontSize: 8,
          alignment: "right",
          margin: [0, 0, 20, 2]
        }
      },
      pageMargins: [25, 165, 32, 40],
    }

    console.log(pdfDefinition)

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  private generatePdfHeader(name: string, surname1: string, surname2: string): any {
    var pdfHeader: any = {
      alignment: 'justify',
      margin: [20, 30, 20, 0],
      columns: [
        {
          stack: [{
            image: 'data:image/png;base64,' + longString,
            width: 100,
            alignment: "right",
            margin: [0, 0, 5, 0]
          }],
          width: 150
        },
        [
          {
            text: name + " " + surname1 + " " + surname2,
            style: 'header'
          },
          {
            text: "V1 - Developer",
            style: 'headerClass'
          }
        ]
      ]
    }
    return pdfHeader;
  }

  private generatePdfFooter(): any {
    var pdfFooter = {
      alignment: "justify",
      columns: [
        {
          stack: [
            {
              text: "SERBATIC S.A.",
              style: 'footer',
              alignment: "left",
            },
            {
              text: "Av. de Europa, 1, 28108 Alcobendas, Madrid",
              style: 'footer',
              alignment: "left"
            }
          ],
          width: "*",
          margin: [190, 0, 0, 0]
        },
        {
          stack: [
            {
              text: "info@serbatic.es",
              link: 'mailto:info@serbatic.es',
              style: 'footer'
            },
            {
              text: "http://www.serbatic.es/",
              link: 'http://www.serbatic.es/',
              style: 'footer'
            }
          ],
          width: 160
        }
      ],
      margin: [0, 0, 8, 0]
    }
    return pdfFooter
  }

  private generatePdfSection(text: string, style: string, rowSpan: number): any {
    return {
      text: text, style: style,
      rowSpan: rowSpan,
      margin: [15, 0, 15, 0]
    }
  }

  private generatePdfText(text: string, style: string, fillColor: string): any {
    return {
      text: text, style: style, fillColor: fillColor
    }
  }

}
