import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  public insertar(coleccion, datos){
    return this.angularFirestore.collection(coleccion).add(datos);
  }
  public consultar(coleccion) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }
  public borrar(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).delete();
  }
  public consultarPorId(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).snapshotChanges();
  }
}
