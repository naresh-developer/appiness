import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  productList(){
    return this.http.get(`${environment.apiUrl}/product/list`)
}

categoryList(){
  return this.http.get(`${environment.apiUrl}/category/list`)
}

createProduct(dataPost){
  return this.http.post(`${environment.apiUrl}/product/create`, dataPost)
  
}
createCategory(dataPost){
  return this.http.post(`${environment.apiUrl}/category/create`, dataPost)
  
}
deleteCategory(id){
  return this.http.get(`${environment.apiUrl}/category/delete/${id}`)
}
}
