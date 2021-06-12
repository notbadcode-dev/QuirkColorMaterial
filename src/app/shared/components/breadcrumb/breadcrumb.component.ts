
import { Component, OnInit } from '@angular/core';

import { GlobalData } from 'src/app/shared/global.data';
import { GlobalUtil } from 'src/app/shared/global.util';

import { EParentView, EView } from 'src/app/enum/enum.global';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  availableViews = EView;
  availableParentViews = EParentView;

  constructor(
    public globalData: GlobalData,
    public globalUtil: GlobalUtil,
    public localStorageService: LocalStorageService,
    private route: Router) {}

  ngOnInit(): void { }

  showBreadCrumb(): boolean {
    const currentParentView: EParentView = this.globalData.getCurrentParentView();
    return currentParentView === EParentView.list ;
  }

  disabledLikedList(): boolean {
    if (!this.localStorageService.existItem('likes')) {
      return true;
    } else {
      if (this.localStorageService.getJsonItem('likes').length === 0) {
        return true;
      }
    }
    
    return false;
  }

  navegatoToLastView(): void {
    let router: string = 'list/all';
    if (this.globalData.getLastParentView() ===  EParentView.list) {
      switch (this.globalData.getLastView()) {
        case EView.allList:
            router = 'list/all';
          break;
        case EView.famousList :
            router = 'list/famous';
          break;
        case EView.allList:
            router = 'list/likes';
          break;  
        default:
          break;
      }
    }

    this.globalData.setCurrentView(this.globalData.getLastView());
    this.route.navigate([router])
    return;
  }
}