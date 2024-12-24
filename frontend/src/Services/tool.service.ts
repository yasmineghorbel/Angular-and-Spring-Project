import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from 'src/Models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
constructor(private http:HttpClient) { }
  getAllTools():Observable<Tool[]>{
    //type de retourne est une observable qui contient la liste des Tools
    return this.http.get<Tool[]>('http://localhost:3000/tools')
  }
  getTool(id:String):Observable<Tool>{
    //type de retourne est une observable qui contient la liste des Tools
    return this.http.get<Tool>(`http://localhost:3000/tools/${id}`)
  }
  add(tool:Tool):Observable<void>{
    return this.http.post<void>('http://localhost:3000/tools',tool)
  }
  delete(toolId:string):Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/tools/${toolId}`)
  }
  edit(id:string,tool:Tool):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/tools/${id}`,tool)
  }
}
