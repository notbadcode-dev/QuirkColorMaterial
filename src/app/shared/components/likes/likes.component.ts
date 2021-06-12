import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EView } from 'src/app/enum/enum.global';
import { Palette } from 'src/app/models/palette.model';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { NotifyService } from 'src/app/services/notification/notify.service';
import { PaletteService } from 'src/app/services/palette/palette.service';
import { GlobalData } from 'src/app/shared/global.data';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  @Input() palette!: Palette;
  @Output() delete = new EventEmitter<Palette>();

  constructor(
    private localStorageService: LocalStorageService,
    private paletteService: PaletteService,
    private notificationService: NotifyService,
    public globalData: GlobalData) { }

  ngOnInit(): void {
  }

  likePalette(event: Event) {
    event.stopPropagation();
    if (!this.localStorageService.existPaletteIdOnLikesIdList(this.palette._id)) {
      this.paletteService.addLike(this.palette._id)
        .subscribe((response: Palette) => {
          if (response._id === this.palette._id) {
            this.localStorageService.pushPaletteOnLikesIdList(this.palette._id);
            this.palette.likes = response.likes;
            // this.pagination.items.filter(foundPalette => foundPalette._id === likePalette._id)[0].likes = response.likes;
            this.palette.liked = true;
          }
        }, error => { this.notificationService.message(error) });
    } else {
      this.paletteService.substractLiked(this.palette._id)
        .subscribe((response: Palette) => {
          if (response._id === this.palette._id) {
            this.localStorageService.deletePaletteOnLikesIdList(this.palette._id);
            this.palette.likes = response.likes;
            // this.pagination.items.filter(foundPalette => foundPalette._id === likePalette._id)[0].likes = response.likes;
            this.palette.liked = false;

            if (this.globalData.getCurrentView() === EView.likesList) {
              this.palette.likes = response.likes;
              this.delete.emit(this.palette);
              // this.pagination.items = this.pagination.items.filter(foundPalette => foundPalette._id !== likePalette._id);
              // this.notificationService.info('Palette has been deleted because disliked');
            }

            // if (this.pagination.items.length === 0) {
            //   this.globalData.setCurrentView(EView.allList);
            //   this.getPalettePagination(1);
            //   this.notificationService.info('Has no likes');
            // }

          }
        }, error => { this.notificationService.message(error) });
    }
  }

}
