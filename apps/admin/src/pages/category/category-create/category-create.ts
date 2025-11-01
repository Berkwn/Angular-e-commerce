import { HttpClient } from '@angular/common/http';
import { Component, computed, linkedSignal, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blank } from 'apps/admin/src/components/blank/blank';
import { lastValueFrom } from 'rxjs';
import { ProductModel } from '../../products/products';
import { CategoryModel, initialCategoryModel } from '../category';
import { api } from 'apps/admin/src/constants';

@Component({
  selector: 'app-category-create',
  imports: [FormsModule,Blank],
  templateUrl: './category-create.html',
 
})
export default class CategoryCreate {
readonly id=  signal<number | undefined>(undefined);

  readonly cardTitle=computed(()=>{
    return this.id() ? "Kategori Güncelle" : "Yeni Kategori Ekle"});

    readonly btnName=computed(()=>{
      return this.id()? "Kategoriyi Güncelle" : "Kategoriyi Kaydet"
    })

constructor(private http:HttpClient
,private activated:ActivatedRoute,
private router:Router
) {

  this.activated.params.subscribe(res=>{
    if(res['id']){
      this.id.set(res['id']);  
  };
  }); 
    


}


  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
   var res = await lastValueFrom(this.http.get<CategoryModel>(`api/categories/${this.id()}`));   
  
   return res;
  }
  })



readonly data = linkedSignal(()=> { return this.result.value() ?? initialCategoryModel;});



  save(form:any)
  { 
    
    if(!form.valid){
    return;}
    if(!this.id()){
      this.http.post(`api/categories`,form.value).subscribe({
        next:()=>{
          alert("Kategori başarıyla kaydedildi.");
          form.reset();
          this.router.navigateByUrl("/categories");
        },
        error:(err)=>{
          alert("Kategori kaydedilirken bir hata oluştu: " + err.message);
        }

    }

    );  
  
    }else{
      this.http.put(`api/categories/${this.id()}`,form.value).subscribe({
        next:()=>{  
          alert("Kategori başarıyla güncellendi.");
          form.reset();
          this.router.navigateByUrl("/categories");
        },
        error:(err)=>{
          alert("Kategori güncellenirken bir hata oluştu: " + err.message);
        }
      }); 

    }
  }

}
