import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interface/gifs-response';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  APIKey = 'iGJA2N2A7iLfSrvslGVMOijnyxkELmq7';
  limit = 10;
  // private _historial: string[] = ['DBZ','Vegeta']; 
  private _historial: string[] = JSON.parse(localStorage.getItem("historial")! ) || [] ;
  private URL: string = 'http://api.giphy.com/v1/gifs';
  private _results: Gif[]= [];  
  
  get historial(){
    return [...this._historial];
  }
  get results(){
    return [...this._results]
  }

  constructor( private http: HttpClient) { }

  getGifs( query: string){
  
    query = query.toLowerCase();
    if(!this._historial.includes(query)){ 
      
      this._historial.unshift(query)
      
      if(this._historial.length >= 11){
        this._historial.pop();
      }

      localStorage.setItem('historial', JSON.stringify( this._historial ))
    }
    else{
      this._historial = this._historial.filter(item => item !== query);
      this._historial.unshift(query);
    }

    let params = new HttpParams()
                      .set("api_key",this.APIKey)
                      .set("q", query ) //Create new HttpParams
                      .set("limit", this.limit.toString()); //Create new HttpParams

    this.http.get<GifsResponse>(`${this.URL}/search`,{params:params})
    .subscribe(
      res => {
        this._results = [...res.data];
      },
      err => {
        console.log('Error');
      }
    )

  }

}
