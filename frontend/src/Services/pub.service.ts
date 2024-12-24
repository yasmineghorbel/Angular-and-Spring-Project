import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pub } from 'src/Models/Pub';

@Injectable({
  providedIn: 'root'
})
export class PubService {
  constructor(private http:HttpClient) { }

getAllPubs():Observable<Pub[]>{
    //type de retourne est une observable qui contient la liste des Pubs
    return this.http.get<Pub[]>('http://localhost:3000/pubs')
  }
  getPub(id:String):Observable<Pub>{
    //type de retourne est une observable qui contient la liste des Pubs
    return this.http.get<Pub>(`http://localhost:3000/pubs/${id}`)
  }
  add(pub:Pub):Observable<void>{
    return this.http.post<void>('http://localhost:3000/pubs',pub)
  }
  delete(pubId:string):Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/pubs/${pubId}`)
  }
  edit(id:string,pub:Pub):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/pubs/${id}`,pub)
  }
}
