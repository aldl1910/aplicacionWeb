import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { Datos } from '../datos';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  nombre1:string="";
  apellidos1:string="";
  datos: Array <Object> =[]
  datosEditando: Datos;
  //resultado:string="";
  document: any = {
    id: "",
    data: {} as Datos
  };

  constructor(
    private formsModule: FormsModule,
    private firestoreService: FirestoreService) { 
      this.datosEditando = {} as Datos;
  }

  ngOnInit(): void {
  }
  enviar() {
    //this.resultado = this.datos.nombre + this.datos.apellidos;
    this.datos.push({nombre:this.nombre1, apellidos:this.apellidos1});
    console.log(this.datos);
  }
  clicBotonInsertar(){
    return this.firestoreService.insertar("clientes", this.datosEditando).then(
      ()=> {
        console.log("Cliente creada correctamente");
        // Limpiar el contenido de la herramienta que se estaba editando
        this.datosEditando = {} as Datos;
      }, (error) => {
        console.error(error);
      }
    );
  }
}
