import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../http/http.service';

import { Palette, PaletteHelper, PalettePaginate, PalettePaginateHelper } from 'src/app/shared/models/palette.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  endpoints = {
    getPalette: `${environment.api}/app-colors/palettes`,
    getAllPalettes: `${environment.api}/app-colors/palettes`,
    getAllPaletteWithPaginate: `${environment.api}/app-colors/palettes/paginate`,
    getFamousPalettes: `${environment.api}/app-colors/palettes/famous`,
    getFamousWithPaginate: `${environment.api}/app-colors/palettes/famous/paginate`,
    getLikesPalettes: `${environment.api}/app-colors/palettes/likes`,
    getLikesWithPaginate: `${environment.api}/app-colors/palettes/likes/paginate`,
    addLiked: `${environment.api}/app-colors/palettes/addLiked`,
    substractLiked: `${environment.api}/app-colors/palettes/substractLiked`,
  }

  constructor(private _httpService: HttpService) { }

  getPalette(paletteId: string): Observable<Palette> {
    return this._httpService.get(`${this.endpoints.getPalette}/${paletteId}`)
    .pipe(
      map((response: any) => PaletteHelper.mapToObject(response.data[0]))
    );
  }

  getAll(): Observable<Palette[]> {
    return this._httpService.get(this.endpoints.getAllPalettes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getAllWithPaginate(page: number = 1, size: number = 12): Observable<PalettePaginate> {
    return this._httpService.get(`${this.endpoints.getAllPaletteWithPaginate}?page=${page}&size=${size}`)
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  getFamousPalettes(): Observable<Palette[]> {
    return this._httpService.get(this.endpoints.getFamousPalettes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getFamousPalettesWithPaginate(page: number = 1, size: number = 12): Observable<PalettePaginate> {
    return this._httpService.get(`${this.endpoints.getFamousWithPaginate}?page=${page}&size=${size}`)
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  getLikesPalettes(likes: string[]): Observable<Palette[]> {
    return this._httpService.post(this.endpoints.getLikesPalettes, likes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getLikesPalettesWithPaginate(page: number = 1, size: number = 12, likes: string[]): Observable<PalettePaginate> {
    return this._httpService.post(`${this.endpoints.getLikesWithPaginate}?page=${page}&size=${size}`, { likes: likes })
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  addLike(paletteId: string): Observable<Palette> {
    return this._httpService.post(`${this.endpoints.addLiked}?_id=${paletteId}`, { })
      .pipe(
        map((response: any) => PaletteHelper.mapToObject(response.data[0]))
      );
  }

  substractLiked(paletteId: string): Observable<Palette> {
    return this._httpService.post(`${this.endpoints.substractLiked}?_id=${paletteId}`, { })
      .pipe(
        map((response: any) => PaletteHelper.mapToObject(response.data[0]))
      );
  }

}
