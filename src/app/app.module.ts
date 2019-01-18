import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteSidebarComponent } from './_layout/site-sidebar/site-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { UsersComponent } from './users/users.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { StylesComponent } from './styles/styles.component';
const appRoutes:Routes=[
  {
    path: '',
        component: AppLayoutComponent, 
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UsersComponent},
          { path: 'clients', component: ClientsComponent},
          { path: 'projects', component: ProjectsComponent},
          { path: 'styles', component: StylesComponent},
        ]
  },
  {
    path:'login',
    component: LoginComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLayoutComponent,
    SiteSidebarComponent,
    DashboardComponent,
    SiteHeaderComponent,
    UsersComponent,
    InventoryItemsComponent,
    ClientsComponent,
    ProjectsComponent,
    StylesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
