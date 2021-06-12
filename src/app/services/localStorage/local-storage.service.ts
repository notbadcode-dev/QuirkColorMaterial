import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public keyLikes: string = 'likes';

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  setJsonItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  getJsonItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  existItem(key: string): boolean {
    return localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null;
  }

  existPaletteIdOnLikesIdList(_id: string): boolean {
    let likesIdlist: string[] = [];
    if (this.getItem(this.keyLikes) !== null && this.getItem(this.keyLikes) !== undefined){
      likesIdlist = this.getItem(this.keyLikes);
      return likesIdlist.indexOf(_id, 0) >= 0;
    }
    return false;
  }

  pushPaletteOnLikesIdList(_id: string): void {
    let likesIdlist: string[] = [];
    if (!this.existItem(this.keyLikes)) {
      this.setJsonItem(this.keyLikes, likesIdlist);
    }

    if (this.existItem(this.keyLikes) && !this.existPaletteIdOnLikesIdList(_id)) {
      likesIdlist = this.getJsonItem(this.keyLikes);
      likesIdlist.push(_id);
      this.setJsonItem(this.keyLikes, likesIdlist);
    }
  }

  deletePaletteOnLikesIdList(_id: string): void {
    let likesIdlist: string[] = [];
    if (this.existItem(this.keyLikes) && this.existPaletteIdOnLikesIdList(_id)) {
      likesIdlist = this.getJsonItem(this.keyLikes);
      likesIdlist = likesIdlist.filter(foundId => foundId !== _id);
      this.setJsonItem(this.keyLikes, likesIdlist);
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
