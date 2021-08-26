import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  get historial(){
    return this,this.gifsService.historial;
  }
  constructor( private gifsService: GifsService) { }

  ngOnInit(): void { }

  buscar(name: string){

    this.gifsService.getGifs(name);
    
  }

  
}
