import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeEsAr from '@angular/common/locales/es-AR';
import { FormTextPipe } from './form-text.pipe';
import { FormsPageModule } from './pages/forms/forms.module';
import { DocumentGeneratorPageModule } from './pages/document-generator/document-generator.module';
import { OptionsPagePageModule } from './options-page/options-page.module';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    OptionsPagePageModule,
    HttpClientModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: localeEsAr, useValue: 'es-AR'
   }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {provide : LocationStrategy ,
    useClass: HashLocationStrategy
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
