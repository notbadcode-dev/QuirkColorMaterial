import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EView } from 'src/app/enum/enum.global';
import { Palette, PaletteHelper } from 'src/app/models/palette.model';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { NotifyService } from 'src/app/services/notification/notify.service';
import { PaletteService } from 'src/app/services/palette/palette.service';
import { GlobalData } from 'src/app/shared/global.data';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  paletteId!: string;
  palette!: Palette;

  creationMode: boolean = false;

  constructor(
    public globalData: GlobalData,
    private route: ActivatedRoute,
    private paletteService: PaletteService,
    private notifyService: NotifyService,
    private localStorageService: LocalStorageService
    ) {
    this.paletteId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.paletteId) {
      this.globalData.setCurrentView(EView.viewPalette);
      this.getPalette(this.paletteId)
      .subscribe((response: Palette) => {
        this.palette = response;
      }, error => { this.notifyService.message(error) })
    } else {
      this.globalData.setCurrentView(EView.newPalette);
      this.creationMode = true;
      this.palette = PaletteHelper.DefaultObject();
    }
  }

  getPalette(paletteid: string): Observable<Palette> {
    return this.paletteService.getPalette(paletteid);
  }

  likePalette(): void {
    if (!this.localStorageService.existPaletteIdOnLikesIdList(this.palette._id)) {
      this.paletteService.addLike(this.palette._id)
        .subscribe((response: Palette) => {
          if (response._id === this.palette._id) {
            this.localStorageService.pushPaletteOnLikesIdList(this.palette._id);
            this.palette.likes = response.likes;
            this.palette.liked = true;
          }
        }, error => { this.notifyService.message(error) });
    } else {
      this.paletteService.substractLiked(this.palette._id)
        .subscribe((response: Palette) => {
          if (response._id === this.palette._id) {
            this.localStorageService.deletePaletteOnLikesIdList(this.palette._id);
            this.palette.likes = response.likes;
            this.palette.liked = false;
          }
        }, error => { this.notifyService.message(error) });
    }
  }

  reversePaletteColors(): string[] {
    if (this.palette && this.palette.colours) {
      return this.palette.colours.slice().reverse();
    }

    return [];
  }
}
