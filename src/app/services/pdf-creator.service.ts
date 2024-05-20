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


  // TODO: Poner en tabla para que se vea decente

  createpdf(arrayData: DatosImpl[]) {
    const imageUrl = '../../assets/serbatic.png';
    var content: any = []
    var header: any;

    arrayData.forEach((datosImpl, index) => {
      if (index != 0) {

        var table = new Table();
        table.widths = [160, '*', '*']
        let row = []
        row.push(this.generatePdfHeader(datosImpl.header, "header", datosImpl.titles.length))

        datosImpl.responses.forEach((response, index) => {
          let titleIndex = index;
          if (titleIndex >= datosImpl.titles.length && (datosImpl.responses.length)%index == 0) {
            row.push(' ')
            row.push('');
            row.push('');
            table.body.push(row);
            row = []
          }
          while (titleIndex >= datosImpl.titles.length) {
            titleIndex = titleIndex - datosImpl.titles.length;
          }
          if (index != 0)
            row.push('')
          row.push(this.generatePdfText(datosImpl.titles[titleIndex], "catalog"));
          row.push(this.generatePdfText(response, "text"));
          table.body.push(row);
          row = [];
        })
        content.push({ table, layout: 'noBorders' })
        content.push({ text: " " })

      } else {
        this.imageService.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
          header = {
            table: {
              widths: [160, '*'],
              body: [
                [
                  {
                    image: base64data,
                    cover: { width: 100, height: 100, valign: "bottom", align: "right" },
                  },
                  {
                    text: 'Francisco Juesas Franco V1-Developer',
                    style: 'header'
                  }
                ]
              ],
              layout: 'noBorders', 
              margin: [0, 600, 0, 600] 
            }
          }
        });
      }
    })

    setTimeout(() => {
      console.log(header);
      console.log(content)
      const pdfDefinition: any = {
        header: header,
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
    }, 200);


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
