import { Component, computed } from '@angular/core';
import { Blank } from '../../components/blank/blank';
import { HttpClient, httpResource } from '@angular/common/http';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { api } from '../../constants';


export const initialCategoryModel: CategoryModel = {
  id: '',
  name: ''
};


export interface CategoryModel {
  id: string;
  name: string;
}

@Component({
  selector: 'app-category',
  imports: [Blank,FlexiGridModule,RouterLink],
  templateUrl: './category.html',

})




export default class Category {

constructor(
  private http:HttpClient
){

}

 
  readonly result=httpResource<CategoryModel[]>(()=>"http://localhost:3000/categories");

  readonly data= computed(()=>this.result.value() ?? []);

  readonly loading=(()=>this.result.isLoading());


  deleteCategory(id:string){
    this.http.delete(`api/categories/${id}`).subscribe({
      next:()=>{
        alert("Kategori başarıyla silindi.");
        window.location.reload()
      }
    });
  }


}
