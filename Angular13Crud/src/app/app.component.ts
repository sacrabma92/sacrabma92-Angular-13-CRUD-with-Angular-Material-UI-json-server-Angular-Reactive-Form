import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['nombreProducto', 'categoria', 'date' ,'estado', 'precio', 'comentarios', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ){}

  ngOnInit(): void {
   this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  };

  getAllProducts(){
    this.api.getProducto().subscribe({
      next:(res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=> {
        alert('Error obteniendo los productos');
      }
    })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProducto(id: number){
    this.api.deleteProducto(id).subscribe({
      next:(res) =>{
        alert("Registro borrado con Exito");
        this.getAllProducts();
      },
      error:() => {
        alert('Error al eliminar el registro');
      }
    })
  }

}
