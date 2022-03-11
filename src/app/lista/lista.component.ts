import { Component, OnInit } from '@angular/core';
import { Datos } from '../datos';
import { FirestoreService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  //@Input() arrayClientesDatos:
  id: string = "";
  datosEditando: Datos;
  document: any = {
    id: "",
    data: {} as Datos
  };

  arrayClientesDatos: any = [{
    id: "",
    data: {} as Datos
  }];

  idClienteSelec: string;

  constructor(
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute, ) {
    this.datosEditando = {} as Datos;
    this.obtenerListaClientes();
   }
   obtenerListaClientes(){
    this.firestoreService.consultar("clientes").subscribe((resultadoConsultaTareas) => {
      this.arrayClientesDatos = [];
      
    
      resultadoConsultaTareas.forEach((datosClientes: any) => {
        this.arrayClientesDatos.push({
          id: datosClientes.payload.doc.id,
          data: datosClientes.payload.doc.data()
          
        });
        console.log(this.arrayClientesDatos);
      })
    });
  }
  
  selecCliente(clienteSelec) {
    console.log("Cliente seleccionado: ");
    console.log(clienteSelec);
    this.idClienteSelec = clienteSelec.id;
    this.datosEditando.nombre = clienteSelec.data.nombre;
    this.datosEditando.apellidos = clienteSelec.data.apellidos;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("clientes", this.idClienteSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaClientes();
      // Limpiar datos de pantalla
      this.datosEditando = {} as Datos;
    })
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firestoreService.consultarPorId("clientes", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.document.data.titulo);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Datos;
      } 
    });
  }

}
