import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { GlobalData } from './shared/global.data';
import { EView } from './enum/enum.global';
import {MatDialog} from '@angular/material/dialog';
import { AboutComponent } from './shared/components/about/about.component';

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
    public globalData: GlobalData,
    private router: Router,
    public dialog: MatDialog
    ) {
      this.globalData.viewChange.subscribe((response: { currentView: EView, lastView: EView }) => {
        this.currentView = response.currentView;
        this.lastView = response.lastView;
      });
  }

  navegateToAdd(): void {
    this.router.navigate(['/maintenance/new']);
  }

  refreshList(): void {
    this.globalData.relaodList.next(true);
  }

  openAboutDialog(): void {
    const dialogRef = this.dialog.open(AboutComponent, {
      hasBackdrop: true,
      position: { top: '50px' }
    });

    //dialogRef.afterClosed().subscribe(result => {});
  }
}
