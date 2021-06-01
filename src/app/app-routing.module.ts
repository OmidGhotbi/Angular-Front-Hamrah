import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'momeni',
    // component: NavigationComponent,
    component: TableComponent,
    children: [
      // {
      //   path: 'dashboard/:form',
      //   component: DashboardComponent,
      // },
    ],
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: '**',
    redirectTo: 'form',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
