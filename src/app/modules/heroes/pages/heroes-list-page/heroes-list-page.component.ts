import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../shared/hero.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeroRemoveComponent } from '../../components/hero-remove/hero-remove.component';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../../configs/routes.config';
import { CookieService } from '@gorniv/ngx-universal';
import { HeroService } from '../../../core/services/hero.service';
import { UtilsHelperService } from '../../../core/services/utils-helper.service';

@Component({
  selector: 'app-heroes-list-page',
  templateUrl: './heroes-list-page.component.html',
  styleUrls: ['./heroes-list-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1, delay: 0 }
    }))])
  ]
})

export class HeroesListPageComponent implements OnInit {

  heroes: Hero[];
  newHeroForm: FormGroup;
  canVote = false;
  error: boolean;

  @ViewChild('form', { static: false }) myNgForm; // just to call resetForm method

  constructor(private heroService: HeroService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
              private i18n: I18n,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.newHeroForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

    this.onChanges();
  }

  ngOnInit() {
  }


  like(hero: Hero) {
    this.canVote = this.heroService.checkIfUserCanVote();
    if (this.canVote) {
      hero.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
    } else {
      this.snackBar.open(this.i18n({ value: 'Can\'t vote anymore', id: '@@cannotVote' }), '', { duration: 1000 });
    }
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(HeroRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  trackByFn(index: any) {
    return index;
  }

  private onChanges() {
    this.newHeroForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open(this.i18n({ value: 'Yeah that\'s a Palindrome!', id: '@@yeahPalindrome' }), '', { duration: 2000 });
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
