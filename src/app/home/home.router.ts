import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { LoggedGuard } from '../guards/logged.guard';
import { UserDataResolver } from '../resolvers/user-data.resolver';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard,LoggedGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: 'forms',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/forms/forms.module').then(m => m.FormsPageModule)
          }
        ]
      },
      {
        path: 'vacaciones',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/vacaciones/vacaciones.module').then(m => m.VacacionesPageModule)
          }
        ]
      },
      
      {
        path: 'documentos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/messages/messages.module').then(
                m => m.MessagesPageModule
              )
          },
          {
            path: ':filename',
            loadChildren: () =>
              import('../pages/messages/messages.module').then(
                m => m.MessagesPageModule
              )
          }
        ]
      },
      {
        path: 'documentgenerator',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/document-generator/document-generator.module').then(
                m => m.DocumentGeneratorPageModule
              )
          }
        ],
        canActivate: [LoggedGuard],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(
                m => m.SettingsPageModule
              )
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/forms',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter {}
