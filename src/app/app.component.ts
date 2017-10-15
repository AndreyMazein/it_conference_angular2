import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<div class="container">
              <div class="row">
                <div class="col-lg-2 card">
                    <div><a class="nav-link" routerLink="/users" routerLinkActive="active">Partisipants</a></div>
                    <div><a class="nav-link" routerLink="/groups" routerLinkActive="active">Groups</a></div>
                </div>

                <div class="col-lg-10">
                  <router-outlet></router-outlet>
                </div>
              </div>


              </div>
`,
})
export class AppComponent  {
}
