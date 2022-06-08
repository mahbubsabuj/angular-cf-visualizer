import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | null = null;
  isDarkTheme: boolean = false;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw home',
        routerLink: '/',
      },
      {
        label: 'Contests',
        icon: 'pi pi-fw contests',
        routerLink: 'contests',
      },
      {
        label: 'Compare',
        icon: 'pi pi-fw compare_arrows',
        routerLink: 'compare',
      },
    ];
  }
  switchTheme() {
    if (this.isDarkTheme) {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = true;
    }
    this.themeService.switchTheme(
      this.isDarkTheme ? 'mdc-dark-deeppurple' : 'mdc-light-deeppurple'
    );
  }
}
