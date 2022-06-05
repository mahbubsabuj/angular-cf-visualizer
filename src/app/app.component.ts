import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedState: any = null;
  title: string = 'Codeforces Visualizer';
  constructor(private themeService: ThemeService) {}
  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
    console.log("YES")
  }
}
