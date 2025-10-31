import { Component, computed, inject, signal } from '@angular/core';
import { Blank } from '../../components/blank/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';


export interface ProductModel{
  id:string;
  name:string;
  imageUrl:string;
  price:number;
  stock:number;
  categoryId?:string;
  categoryName?:string; 
  
}
export const initialProductModel: ProductModel = {
  id: "0",
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "123",
  categoryName: "Telefon",
};


@Component({
  selector: 'app-products',
  imports: [Blank,FlexiGridModule,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export default class Products {
  private router= inject(Router);
  readonly http= inject(HttpClient);
  readonly #toast= inject(FlexiToastService);
   readonly result= httpResource<ProductModel[]>(()=>"http://localhost:3000/products")
   readonly loading= computed(()=>this.result.isLoading());
   readonly data= computed(()=>

    this.result.value()?? []
   );







breadcrumbs(): import("../layouts/breadcrumb").BreadcrumbItem[] {
throw new Error('Method not implemented.');
}



readonly categoryFilter=signal<FlexiGridFilterDataModel[]>([
  {name:'Telefon',value:'Telefon'},
  {name:'Bilgisayar',value:'Bilgisayar'},
  {name:'Tablet',value:'Tablet'},
]);


deleteProduct(id:number){
  this.http.delete("http://localhost:3000/products/"+id).subscribe({
    next:()=>{
     alert("Ürün başarıyla silindi.");
      window.location.reload();
    this.router.navigateByUrl("/products");
    },
    error:(err)=>{
        alert("Ürün silinirken bir hata oluştu."+ err.message);
    }
  });
}
}

