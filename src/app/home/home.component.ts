import { Component, OnInit } from '@angular/core';
import { Datos } from '../datos';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    private router: Router, ) {
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
      })
    });
  }
  
  selecCliente(clienteSelec) {
    console.log("Cliente seleccionado: ");
    console.log(clienteSelec);
    this.idClienteSelec = clienteSelec.id;
    this.datosEditando.nombre = clienteSelec.data.nombre;
    this.datosEditando.apellidos = clienteSelec.data.apellidos;
    this.router.navigate(['/lista', this.idClienteSelec]);
  }
  ngOnInit(): void {
  }
}
