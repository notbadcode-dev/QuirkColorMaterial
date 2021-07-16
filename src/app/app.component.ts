import { Component } from '@angular/core';
import { EView } from './shared/enum/enum.global';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticsService } from './core/services/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quirk-color-material';

  currentView!: EView;
  lastView!: EView;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private analyticsService: AnalyticsService
    ) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.analyticsService.routeTraking(event);
        }
      });
  }
}
