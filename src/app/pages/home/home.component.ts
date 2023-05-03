import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

})
export class HomeComponent implements OnInit {

  cols =3 ; // on intialise le nombre de colonnes a afficher (par défaut)
  constructor(){}

  ngOnInit(): void {
    
  }

  /**
   * ici on modifie le nombre de colonnes a afficher 
   * en cliquant sur les icones, on passe à la variable une nouvelle valeur
   * @param colsNum 
   */
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }

}
