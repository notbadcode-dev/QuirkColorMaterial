import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EView } from 'src/app/shared/enum/enum.global';
import { Palette } from 'src/app/shared/models/palette.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { NotifyService } from 'src/app/shared/services/notification/notify.service';
import { PaletteService } from 'src/app/shared/services/palette/palette.service';

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
    private notificationService: NotifyService) { }

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
            this.palette.liked = true;
          }
        }, error => { this.notificationService.message(error) });
    } else {
      this.paletteService.substractLiked(this.palette._id)
        .subscribe((response: Palette) => {
          if (response._id === this.palette._id) {
            this.localStorageService.deletePaletteOnLikesIdList(this.palette._id);
            this.palette.likes = response.likes;
            this.palette.liked = false;

            this.palette.likes = response.likes;
            this.delete.emit(this.palette);
          }
        }, error => { this.notificationService.message(error) });
    }
  }

}
