import { Route } from '@angular/router';

export const appRoutes: Route[] = [

    {
        path: 'login',
        loadComponent:()=>import('./pages/login/login')
    },
    {
        path:'',
        loadComponent:()=>import('./pages/layouts/layouts'),
        children:[
            {
                path:"",
                loadComponent:()=>import('./pages/home/home')
            },
            {
                path:"products",
                loadComponent:()=>import('./pages/products/products')
            },
            {
                path:"products/create",
                loadComponent:()=>import('./pages/products/create/product-create')
            },{
                path:"products/edit/:id",
                loadComponent:()=>import('./pages/products/create/product-create')
            },
            {
                path:"categories",
                loadComponent:()=>import('./pages/category/category')
            },{
                path:"category/create",
                loadComponent:()=>import('./pages/category/category-create/category-create')
            },{
                path:"category/edit/:id",
                loadComponent:()=>import('./pages/category/category-create/category-create')
            },{
                path:"users",
                loadComponent:()=>import('./pages/user/user')
            },{
                path:"users/create",
                loadComponent:()=>import('./pages/user/user-create/user-create')
            },{
                path:"users/edit/:id",
                loadComponent:()=>import('./pages/user/user-create/user-create')
            }
        ]
    }
];
