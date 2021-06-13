import { Component } from '@angular/core';
import { EView } from './shared/enum/enum.global';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
    ) {
  }

  openAboutDialog(): void {
    const dialogRef = this.dialog.open(AboutComponent, {
      hasBackdrop: true,
      position: { top: '50px' }
    });
  }
}
