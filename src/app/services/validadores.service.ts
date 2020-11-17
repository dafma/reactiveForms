import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'perez') {
      return {
        noHerrera: true
      }
    }

    return null;

  }
}
