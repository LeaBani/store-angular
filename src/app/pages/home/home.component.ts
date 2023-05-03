import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

})
export class HomeComponent implements OnInit {

  cols =3 ; // on intialise le nombre de colonnes a afficher
  constructor(){}

  ngOnInit(): void {
    
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }

}
