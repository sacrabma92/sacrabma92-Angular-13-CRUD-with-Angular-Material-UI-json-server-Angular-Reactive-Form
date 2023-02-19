import { ApiService } from './../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  accionBtn : string = "Agregar";

  listaFrescura = ['De primera', 'Segunda mano', 'Reutilizado']

  formularioProducto !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>
  ){  }

  ngOnInit(){
    this.formularioProducto = this.fb.group({
      nombreProducto : ['', Validators.required],
      categoria : ['', Validators.required],
      estado : ['', Validators.required],
      precio : ['', Validators.required],
      comentarios : ['', Validators.required],
      date : ['', Validators.required],
    });

    if(this.editData){
      this.accionBtn = 'Actualizar';
      this.formularioProducto.controls['nombreProducto'].setValue(this.editData.nombreProducto);
      this.formularioProducto.controls['categoria'].setValue(this.editData.categoria);
      this.formularioProducto.controls['estado'].setValue(this.editData.estado);
      this.formularioProducto.controls['precio'].setValue(this.editData.precio);
      this.formularioProducto.controls['comentarios'].setValue(this.editData.comentarios);
      this.formularioProducto.controls['date'].setValue(this.editData.date);
    }
  }

  agregarProducto(){
    if(!this.editData){
      if(this.formularioProducto.valid){
        this.api.postProducto(this.formularioProducto.value).subscribe({
          next:(res) => {
            alert("Producto añadido, Exitosamente")
            this.formularioProducto.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert('Error al añadir el producto')
          }
        })
      }
    }else{
      this.actualizarProducto();
    }
  }

  actualizarProducto(){
    this.api.putProducto(this.formularioProducto.value, this.editData.id).subscribe({
      next:(res) => {
        alert("Producto actualizadon con Exito");
        this.formularioProducto.reset();
        this.dialogRef.close('update');
      },
      error:()=> {
        alert("Error actualizando el dato");
      }
    })
  }
}
