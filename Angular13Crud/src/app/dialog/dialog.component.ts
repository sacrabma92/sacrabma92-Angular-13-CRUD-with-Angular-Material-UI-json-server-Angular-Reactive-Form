import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  listaFrescura = ['De primera', 'Segunda mano', 'Reutilizado']

  formularioProducto !: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){  }

  ngOnInit(){
    this.formularioProducto = this.fb.group({
      nombreProducto : ['', Validators.required],
      categoria : ['', Validators.required],
      estado : ['', Validators.required],
      precio : ['', Validators.required],
      comentarios : ['', Validators.required],
      date : ['', Validators.required],
    })
  }

  agregarProducto(){
    console.log(this.formularioProducto.value)
  }
}
