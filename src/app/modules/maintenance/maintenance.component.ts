import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Palette, PaletteHelper } from 'src/app/shared/models/palette.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { NotifyService } from 'src/app/shared/services/notification/notify.service';
import { PaletteService } from 'src/app/shared/services/palette/palette.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  paletteId!: string;
  palette!: Palette;

  private previousUrl: string = '';
  private currentUrl: string = '';

  creationMode: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private paletteService: PaletteService,
    private notifyService: NotifyService,
    private localStorageService: LocalStorageService
    ) {
    this.paletteId = this.activatedRouter.snapshot.params.id;
    route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  ngOnInit(): void {
    if (this.paletteId) {
      this.getPalette(this.paletteId)
      .subscribe((response: Palette) => {
        this.palette = response;
      }, error => { this.notifyService.message(error) })
    } else {
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

  navegatoToLastView(): void {
    this.route.navigate([this.previousUrl]);
  }
}
