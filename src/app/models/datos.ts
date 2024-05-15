export interface Datos {
  header: string;
  titles: string[];
  responses: string[]
  ampliable?: boolean;
}

export class DatosImpl implements Datos {
  constructor(public header: string, public titles: string[], public responses: string[], public ampliable: boolean) { }

  static crearDatos(title: string, data: string[], ampliable: boolean): DatosImpl {
    var responses: string[] = [];
    for (let value in data) {
      responses.push('')
    }
    return new DatosImpl(title, data, responses, ampliable);
  }
}
