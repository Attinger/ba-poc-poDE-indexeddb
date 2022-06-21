import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export type ExtendedRoute = Route & {
  name?: string;
};

export const routes: ExtendedRoute[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
