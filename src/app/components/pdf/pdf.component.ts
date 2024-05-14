import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {

  createpdf() {
    const pdfDefinition: any = {
      content: [
        {
          title: 'titulo',
          text: 'Hola mundo'
        },
        {
          text: 'ooasdjojda'
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
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



