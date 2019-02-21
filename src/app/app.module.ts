import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

///////import//////////
import{ HttpClientModule } from '@angular/common/http';
import { NewsApiService } from './news-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/pages/log-in/log-in.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewsComponent } from './components/pages/news/news.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    NewsComponent,
    NavbarComponent,
    MyProfileComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    NewsApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
