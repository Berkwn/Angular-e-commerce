import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, Inject, inject, linkedSignal, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blank } from 'apps/admin/src/components/blank/blank';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';
import { ProductModel } from '../products';


@Component({
  selector: 'app-product-create',
  imports: [Blank, FormsModule],
  templateUrl: './product-create.html',

})
export default class ProductCreate {
  readonly btnName=computed(()=>{
    return this.id() ? "Ürünü Güncelle" : "Ürünü Kaydet"
  });
readonly id=  signal<number | undefined>(undefined);
readonly result= resource({
  params:()=> this.id(),
  loader: async ()=>{
    var res = await lastValueFrom(this.http.get<ProductModel>(`http://localhost:3000/products/${this.id()}`));
    return res;
  }
})
   readonly #activated=inject(ActivatedRoute);

   readonly data = linkedSignal(()=> this.result.value());

   readonly cardTitle=computed(()=>{
    
    return this.id() ? "Ürün Güncelle" : "Yeni Ürün Ekle"});

  constructor(private http:HttpClient,
  
  private router:Router
  
    
  ) {
    this.#activated.params.subscribe(res=>{
      if(res['id']){
        this.id.set(res['id']);  
    };
    });
  }



save(form: any) {
  if (!form.valid) {
    return;
  }

  if (this.id()) {
    // Güncelleme işlemi
    this.http.put(`http://localhost:3000/products/${this.id()}`, form.value).subscribe({
      next: () => {
        alert("Ürün başarıyla güncellendi.");
        form.reset();
        this.router.navigateByUrl("/products");
      },
      error: (err) => {
        alert("Ürün güncellenirken bir hata oluştu: " + err.message);
      },
    });
  } else {
    // Yeni kayıt işlemi
    this.http.post("http://localhost:3000/products", form.value).subscribe({
      next: () => {
        alert("Ürün başarıyla kaydedildi.");
        form.reset();
        this.router.navigateByUrl("/products");
      },
      error: (err) => {
        alert("Ürün kaydedilirken bir hata oluştu: " + err.message);
      },
    });
  }
}


  

  
}
