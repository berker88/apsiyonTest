import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'apsiyon-test';
  selectedTheme = 'primary-theme';
  showThemeSelection = false;
  ngOnInit(): any {
    console.log('page initiated');
  }
  getSelectedTheme(): any {
    return this.selectedTheme;
  }
  setTheme(theme): void {
    this.selectedTheme = theme;
  }
  toggleThemeSelectionBox(): void {
    this.showThemeSelection = !this.showThemeSelection;
  }
}
