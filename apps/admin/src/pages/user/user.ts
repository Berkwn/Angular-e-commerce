import { Component, computed, linkedSignal } from '@angular/core';
import { Blank } from "../../components/blank/blank";
import { HttpClient, httpResource } from '@angular/common/http';
import { FlexiGridModule } from 'flexi-grid';
import { Router, RouterLink } from '@angular/router';


export interface UserModel{
  id?:string,
  firstName:string,
  lastName:string,
  fullName:string,
  userName:string,
  email:string,
  password:string,
  isAdmin:boolean
}

export const initialUserModel:UserModel={
  firstName:"",
  lastName:"",
  userName:"",
  email:"",
  password:"",
  isAdmin:false,
  
  get fullName():string{
    return `${this.firstName} ${this.lastName}`
  }
}



@Component({
  selector: 'app-user',
  imports: [Blank,FlexiGridModule,RouterLink],
  templateUrl: './user.html',

})




export default class User {

  constructor(
    private router:Router,
    private http:HttpClient
  ){

  }
//getAll isteği yapmış olduk.
  readonly result=httpResource<UserModel[]>(()=>"api/users");
  readonly data=linkedSignal(()=>{
    const users= this.result.value()?? [];
    return users;
  })
  readonly isLoading=computed(()=> this.result.isLoading());



  deleteUser(id:string)
  {

    this.http.delete(`api/users/${id}`).subscribe({
      
      next: ()=>{
        alert("Kullanıcı başarıyla silindi")
        this.result.reload();
      },
      error:(err)=>{
        alert("kullanıcı silinirken bir hata ile karşılaşıldı" + err.message)
      }
      
    
    })

  }
}
