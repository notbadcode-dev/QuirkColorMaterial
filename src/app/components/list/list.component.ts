import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from 'src/app/shared/global.data';
import { Palette, PalettePaginate, PalettePaginateHelper } from 'src/app/models/palette.model';
import { NotifyService } from 'src/app/services/notification/notify.service';
import { PaletteService } from 'src/app/services/palette/palette.service';
import { EView } from 'src/app/enum/enum.global';
import { GlobalUtil } from 'src/app/shared/global.util';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public pagination: PalettePaginate = PalettePaginateHelper.DefaultObject();

  availableViews = EView;
  palettesPerPage: number = 18;

  infiniteScrollItems: Palette[] = [];
  infiniteScrollPage: number = 1;
  infiniteScrollMode: boolean = true;

  constructor(
    public globalData: GlobalData,
    public globalUtil: GlobalUtil,
    private paletteService: PaletteService,
    private notifyService: NotifyService,
    private localStorageService: LocalStorageService,
    private router: Router) {
  
      this.globalData.viewChange.subscribe((response: { currentView: EView, lastView: EView }) => {
        if (response.currentView !== response.lastView) {
          this.getPalettePagination();
        }
      });

      this.globalData.relaodList.subscribe((response) => {
        if (response) {
          this.getPalettePagination(true);
        }
      });
    }

  ngOnInit(): void {
    this.getPalettePagination();
  }

  getPalette(paletteId: string):Observable<Palette> {
    return this.paletteService.getPalette(paletteId);
  }

  getAllPalettes(): Observable<Palette[]> {
    return this.paletteService.getAll();
  }

  getAllPalettesWithPaginate(page: number, size: number): Observable<PalettePaginate> {
    return this.paletteService.getAllWithPaginate(page, size);
  }

  getFamousPalettes(): Observable<Palette[]> {
    return this.paletteService.getFamousPalettes();
  }

  getFamousPalettesWithPaginate(page: number, size: number): Observable<PalettePaginate> {
    return this.paletteService.getFamousPalettesWithPaginate(page, size);
  }

  getLikesPalettes(likes: string[]): Observable<Palette[]> {
    return this.paletteService.getLikesPalettes(likes);
  }

  getLikesPalettesWithPaginate(page: number, size: number, likes: string[]): Observable<PalettePaginate> {
    return this.paletteService.getLikesPalettesWithPaginate(page, size, likes);
  }

  getPalettePagination(reload: boolean = false): void {
    if (this.infiniteScrollPage !== this.pagination.currentPage || this.pagination.totalItems === 0 || reload) {
      let page: number = this.infiniteScrollPage;
      let perPage: number = this.palettesPerPage;

      if (reload) {
        page = 1;
        perPage = this.pagination.currentPage * this.palettesPerPage;
      }

      if (this.globalData.getCurrentView() === EView.allList) {
        this.getAllPalettesWithPaginate(page, perPage)
          .subscribe((response : PalettePaginate) => {
            this.setPalettesItems(response, true, reload);  
          }, error => { this.notifyService.message(error) })
  
      } else if (this.globalData.getCurrentView() === EView.famousList) {
  
        this.getFamousPalettesWithPaginate(page, perPage)
          .subscribe((response : PalettePaginate) => {
            this.setPalettesItems(response, false, reload);    
          }, error => { this.notifyService.message(error) })
  
      } else if (this.globalData.getCurrentView() === EView.likesList && this.localStorageService.existItem(this.localStorageService.keyLikes)) {
        const storageLikes: string[] = this.localStorageService.getJsonItem(this.localStorageService.keyLikes);
        if (storageLikes.length > 0) {
          this.getLikesPalettesWithPaginate(page, perPage, storageLikes)
          .subscribe((response : PalettePaginate) => {
            this.setPalettesItems(response, true, reload); 
          }, error => { this.notifyService.message(error) })
        } else {
          this.pagination = PalettePaginateHelper.DefaultObject();
        }
  
      }
    }
  }

  setPalettesItems(pagination: PalettePaginate, refillLikes: boolean, reload: boolean): void {
    if (reload) {
      this.infiniteScrollItems = pagination.items;
    } else {
      this.pagination = pagination;
      this.infiniteScrollPage = this.pagination.items.length === this.palettesPerPage ? this.pagination.nextPage : this.pagination.currentPage;
      this.infiniteScrollItems = [...new Set([...this.infiniteScrollItems, ...pagination.items])];
    }

    if (refillLikes) {
      this.refillLikedPalettes();
    }
  }

  refillLikedPalettes(): void {
    const storageLikes: string[] = this.localStorageService.getJsonItem(this.localStorageService.keyLikes);
    this.pagination.items.map(palette => palette.liked = storageLikes.find(foundId => foundId === palette._id) !== undefined );
  }

  viewPalette(palette: Palette) {
    this.router.navigate([`maintenance/view/${palette._id}`])
  }

  onScroll() {
    this.getPalettePagination();
  }
}
