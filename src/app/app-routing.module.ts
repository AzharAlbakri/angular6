import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/pages/log-in/log-in.component';
import { HomeComponent } from './components/pages/home/home.component'
import { NewsComponent } from './components/pages/news/news.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: LogInComponent},
  {path: 'news', component: NewsComponent},
  {path: 'my-profile', component: MyProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
