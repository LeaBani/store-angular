import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT : { [id:number]: number }= { 1: 400, 3: 335, 4: 350 }; // on défini la hauteur en fonction du nombre d'articles à afficher

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

})
export class HomeComponent implements OnInit {

  cols = 3 ; // on intialise le nombre de colonnes a afficher (par défaut)
  rowHeight = ROWS_HEIGHT[this.cols]; // hauteur initiale est à 3
  category: string | undefined;

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
    this.rowHeight = ROWS_HEIGHT[this.cols]; // on met à jour la hauteur initiale

  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

}
