import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, linkedSignal, resource, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { initialUserModel, UserModel } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { initialCategoryModel } from '../../category/category';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule],
  templateUrl: './user-create.html',
 
})
export default class UserCreate {

  readonly id=signal<number| undefined>(undefined);
readonly result= resource({
  params:()=> this.id(),
  loader:async()=>{
    var res=await lastValueFrom(this.http.get<UserModel>(`api/users/${this.id()}`))
    return res;
  }
})
readonly data=computed(()=>this.result.value()?? {...initialUserModel})

  readonly activated=inject(ActivatedRoute)

  constructor(private http:HttpClient,
    private router:Router
  ){
this.activated.params.subscribe(res=>{
  if(res['id']){
    this.id.set(res['id'])
  }
})
  }

  readonly btnName=computed(()=>{
  return  this.id() ? " güncelle" : " Kaydet"
  })

  readonly cardTitle=computed(()=>{
    return this.id()? "Kullanıcı Güncelle":"Kullanıcı Ekle"
  })



  save(form:NgForm){
    if(!form.valid){
      return;
    }

    if(!this.id()){

      this.http.post("api/users",this.data()).subscribe(res=>{
        alert("kullanıcı ekleme işlemi başarılı");
        
        this.router.navigateByUrl('/users');
        return res;
      })
    }else{
      
      this.http.put(`api/users/${this.id()}`,this.data()).subscribe(res=>{
        alert("kullanıcı güncelleme işlemi başarılı");
        
        this.router.navigateByUrl('/users');
        return res;
      })
    }


  }
}
