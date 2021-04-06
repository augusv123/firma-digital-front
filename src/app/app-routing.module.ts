import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'vacaciones', loadChildren: './pages/vacaciones/vacaciones.module#VacacionesPageModule' },
  { path: 'document-generator', loadChildren: './pages/document-generator/document-generator.module#DocumentGeneratorPageModule' },
  { path: 'forms', loadChildren: './pages/forms/forms.module#FormsPageModule' },
  { path: 'performance', loadChildren: './pages/performance/performance.module#PerformancePageModule' },
  { path: 'situation-update', loadChildren: './pages/situation-update/situation-update.module#SituationUpdatePageModule' },
  { path: 'options-page', loadChildren: './options-page/options-page.module#OptionsPagePageModule' },
  { path: 'pdfview', loadChildren: './pdfview/pdfview.module#PDFViewPageModule' },

  { path: 'signed-files', loadChildren: './pages/signed-files/signed-files.module#SignedFilesPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
