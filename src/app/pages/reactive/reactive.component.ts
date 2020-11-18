import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido() {
    // obtenemos el valor del formname
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.email, Validators.required]],
      usuario: ['', Validators.required, this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners(){
    // saber cuando la forma sufra cambios
    // cualquier valor que sugfra camhios lo esta escuchando
    this.forma.valueChanges.subscribe( valor => {
        console.log(valor);
        
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      nombre: "juans",
      apellido: "perez",
      correo: "a@gmail.com",
      direccion: {
        distrito: "Ottawa",
        ciudad: "Ontario"
      }
    });
    // cargar datos al array
    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo() {
    // accion o evento al boton agregar
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    // elimina pasatiempo del array
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }

      });
    }
    // reseteo
    this.forma.reset({
      nombre: "Sin nombre"
    });
  }



}
