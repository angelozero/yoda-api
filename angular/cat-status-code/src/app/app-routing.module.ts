import { AuthGuard } from './core/auth/auth.guard';
import { SingUpComponent } from './home/sing-up/sing-up.component';
import { LoginGuard } from './core/auth/login.guard';
import { SingInComponent } from './home/sing-in/sing-in.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver.pipe';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // AuthGuard -> se o usuario estiver na home e estiver logado isso o redireciona para a time-line 
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: SingInComponent,
      },
      {
        path: 'singup',
        component: SingUpComponent
      }
    ]
  },
  {
    path: 'user/:userName',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver
    }
  },
  {
    path: 'photo/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [
    // useHash: true ---> adiciona o caracter "#" nas rotas para que nao tenha uma chamada no backend
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
