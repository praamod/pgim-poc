import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../../../configs/app.config';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from '@gorniv/ngx-universal';
import { ProgressBarService } from '../../../../modules/core/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  navigationLinks: any[];

  constructor(@Inject(APP_CONFIG) public appConfig: any,
    private progressBarService: ProgressBarService,
    private cookieService: CookieService,
    private router: Router) {
    this.navigationLinks = [
      { name: 'about-us', label: 'ABOUT US', target: '/' },
      { name: 'products', label: 'PRODUCTS', target: '/' },
      { name: 'insights', label: 'INSIGHTS', target: '/' },
      { name: 'resources', label: 'RESOURCES', target: '/' },
      { name: 'retirement', label: 'RETIREMENT', target: '/' },
      { name: 'contact', label: 'CONTACT', target: '/' }
    ]
  }

  ngOnInit() {
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.progressBarService.getUpdateProgressBar().subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }
}
