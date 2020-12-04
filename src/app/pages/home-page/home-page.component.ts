import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from 'ng-animate';
import { RoutesConfig, ROUTES_CONFIG } from 'src/app/configs/routes.config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 1, delay: 0 },
        })
      ),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(ROUTES_CONFIG) public routesConfig: any
  ) {}

  ngOnInit() {
  }

  goToPgim() {
    this.router.navigate([RoutesConfig.routes.pgim]);
  }
}
