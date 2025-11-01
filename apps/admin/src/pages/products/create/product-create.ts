import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, Inject, inject, linkedSignal, resource, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blank } from 'apps/admin/src/components/blank/blank';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';
import { initialProductModel, ProductModel } from '../products';
import { api } from 'apps/admin/src/constants';
import { CategoryModel } from '../../category/category';
import { FlexiSelectModule } from 'flexi-select';


@Component({
  selector: 'app-product-create',
  imports: [Blank, FormsModule,FlexiSelectModule],
  templateUrl: './product-create.html',

})
export default class ProductCreate {
  readonly btnName=computed(()=>{
    return this.id() ? "Ürünü Güncelle" : "Ürünü Kaydet"
  });
readonly id=  signal<number | undefined>(undefined);

 readonly categories= httpResource<CategoryModel[]>(()=>`api/categories`);
  readonly CatData= linkedSignal(()=>{
    const category=this.categories.value()??[];
    console.log(category);
    return category;
  })
  readonly categoryLoading= computed(()=>this.categories.isLoading());

readonly result= resource({
  params:()=> this.id(),
  loader: async ()=>{
    var res = await lastValueFrom(this.http.get<ProductModel>(`api/products/${this.id()}`));
   
    return res;
  }
})
   readonly #activated=inject(ActivatedRoute);

   readonly data = linkedSignal(()=> this.result.value() ?? {...initialProductModel});

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



save(form: NgForm) {
  if (!form.valid) return;

  // Form değerlerini this.data() üzerinden alıyoruz
  const currentData = this.data();

  if (this.id()) {
    // Güncelleme işlemi
    this.http.put(`api/products/${this.id()}`, currentData).subscribe({
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
    // Eğer categoryName boşsa setCategoryName() ile güncelle
    if (!currentData.categoryName) this.setCategoryName();

    this.http.post(`api/products`, this.data()).subscribe({
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

setCategoryName() {
  const id = this.data()?.categoryId;
  if (!id) return;

  const category = this.CatData().find(c => c.id === id);
  this.data.update(prev => ({
    ...prev,
    categoryName: category?.name ?? ''
  }));
}


  
}
