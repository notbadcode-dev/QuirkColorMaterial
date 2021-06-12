import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { EParentView, EView as EView } from "../enum/enum.global";

@Injectable()
export class GlobalData {

    private currentView: EView = EView.allList;
    private lastView: EView = EView.notFound;
    private currentParentView: EParentView = EParentView.list;
    private lastParentView: EParentView = EParentView.notFound;

    viewChange: Subject<{ currentView: EView, lastView: EView }> = new Subject<{ currentView: EView, lastView: EView }>();
    relaodList: Subject<boolean> = new Subject<boolean>();

    constructor() {}

    setCurrentParentView(setterParentView: any): void {
        this.lastParentView = this.currentParentView;
        this.currentParentView = setterParentView;
    }

    getCurrentParentView(): EParentView {
        return this.currentParentView;
    }

    getLastParentView(): EParentView {
        return this.lastParentView;
    }

    setCurrentView(setterView: any): void {
        this.lastView = this.currentView;
        this.currentView = setterView;

        switch (setterView) {
            case EView.allList:
            case EView.famousList:
            case EView.likesList:
                this.setCurrentParentView(EParentView.list);
                break;
            case EView.viewPalette:
            case EView.newPalette:
            case EView.editPalette:
                this.setCurrentParentView(EParentView.palette);
                break;
            case EView.about:
                this.setCurrentParentView(EParentView.about);
                break;
            case EView.notFound:
                this.setCurrentParentView(EParentView.notFound);
                break;
            default:
                this.currentView = EView.notFound;
                this.currentParentView = EParentView.notFound;
                break;
        }
    }

    getCurrentView(): EView {
        return this.currentView;
    }

    getLastView(): EView {
        return this.lastView;
    }

    hiddenRefresh(): boolean {
        return this.currentView === EView.allList
            || this.currentView === EView.famousList
            || this.currentView === EView.likesList;
    }
}