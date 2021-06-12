import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Palette, PaletteHelper, PalettePaginate, PalettePaginateHelper } from 'src/app/models/palette.model';
import { Enspoints as Endpoints } from 'src/environments/endpoints';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  constructor(private _httpService: HttpService) { }

  getPalette(paletteId: string): Observable<Palette> {
    return this._httpService.get(`${Endpoints.getPalette}/${paletteId}`)
    .pipe(
      map((response: any) => PaletteHelper.mapToObject(response.data[0]))
    );
  }

  getAll(): Observable<Palette[]> {
    return this._httpService.get(Endpoints.getAllPalettes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getAllWithPaginate(page: number = 1, size: number = 12): Observable<PalettePaginate> {
    return this._httpService.get(`${Endpoints.getAllPaletteWithPaginate}?page=${page}&size=${size}`)
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  getFamousPalettes(): Observable<Palette[]> {
    return this._httpService.get(Endpoints.getFamousPalettes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getFamousPalettesWithPaginate(page: number = 1, size: number = 12): Observable<PalettePaginate> {
    return this._httpService.get(`${Endpoints.getFamousWithPaginate}?page=${page}&size=${size}`)
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  getLikesPalettes(likes: string[]): Observable<Palette[]> {
    return this._httpService.post(Endpoints.getLikesPalettes, likes)
      .pipe(
        map((response: any) => PaletteHelper.mapToObjectList(response.data))
      );
  }

  getLikesPalettesWithPaginate(page: number = 1, size: number = 12, likes: string[]): Observable<PalettePaginate> {
    return this._httpService.post(`${Endpoints.getLikesWithPaginate}?page=${page}&size=${size}`, { likes: likes })
      .pipe(
        map((response: any) => PalettePaginateHelper.mapToObject(response.data))
      );
  }

  addLike(paletteId: string): Observable<Palette> {
    return this._httpService.post(`${Endpoints.addLiked}?_id=${paletteId}`, { })
      .pipe(
        map((response: any) => PaletteHelper.mapToObject(response.data[0]))
      );
  }

  substractLiked(paletteId: string): Observable<Palette> {
    return this._httpService.post(`${Endpoints.substractLiked}?_id=${paletteId}`, { })
      .pipe(
        map((response: any) => PaletteHelper.mapToObject(response.data[0]))
      );
  }

}
