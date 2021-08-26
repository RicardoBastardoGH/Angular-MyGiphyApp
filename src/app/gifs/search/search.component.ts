import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch! :ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar( event: any){
    let valor = this.txtSearch.nativeElement.value;

    if (valor.trim().length === 0){ return; }

    this.gifsService.getGifs(valor);
    
  }
}
