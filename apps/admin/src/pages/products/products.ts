import { Component, computed, inject, signal } from '@angular/core';
import { Blank } from '../../components/blank/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';



export interface ProductModel {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId?: string;
  categoryName?: string;
}

export const initialProductModel: ProductModel = {
  id: "0",
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "",
  categoryName: "",
};

@Component({
  selector: 'app-products',
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
})
export default class Products {
  private router = inject(Router);
  private http = inject(HttpClient);

  // httpResource ile otomatik veri çek
  readonly result = httpResource<ProductModel[]>(() => `api/products`);
  readonly data = computed(() => {
    const products = this.result.value() ?? [];
    console.log('Products:', products); // veri kontrolü
    return products;
  });

 

  readonly loading = computed(() => this.result.isLoading());




  // Ürün silme işlemi
  deleteProduct(id: string) {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    this.http.delete(`api/products/${id}`).subscribe({
      next: () => {
        alert('Ürün başarıyla silindi.');
        // Veri otomatik güncellensin
        this.result.reload();
      },
      error: (err) => {
        alert('Ürün silinirken bir hata oluştu: ' + err.message);
      },
    });
  }
}
