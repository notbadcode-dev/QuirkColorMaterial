import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EParentView, EView as EView } from "../../shared/enum/enum.global";

import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import * as isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

@Injectable()
export class GlobalUtilService {

    private currentView: EView = EView.allList;
    private currentParentView: EParentView = EParentView.list;

    constructor(private router: Router) {}

    // Dates · dayjs
    static getSinceFromDate(date: Date): string {
        const days = this.getSinceDays(date);
        if (this.dayIsToday(date)) {
            return 'today ago';
        } else if (this.dayIsYesterday(date)) {
            return 'yerterday';
        } else if (this.getSinceDays(date) < 7) {
            return `${this.getSinceDays(date)} days ago`;
        } else if (this.getSinceWeeks(date) === 1) {
            return `${this.getSinceWeeks(date)} week ago`;
        } else if (this.getSinceDays(date) > 7 && this.getSinceWeeks(date) < 4) {
            return `${this.getSinceWeeks(date)} weeks ago`;
        } else if (this.getSinceMonths(date) === 1) {
            return `${this.getSinceMonths(date)} moth ago`;
        } else if (this.getSinceWeeks(date) > 4 && this.getSinceMonths(date) < 12) {
            return `${this.getSinceMonths(date)} moths ago`;
        } else if (this.getSinceYears(date) === 1 || (this.getSinceYears(date) > 1 && this.getSinceYears(date) < 2)) {
            return `${this.getSinceYears(date)} year ago`
        } else if (this.getSinceYears(date) <= 5)  {
            return `${this.getSinceYears(date)} years ago`
        } else if (this.getSinceYears(date) > 5 ) {
            return 'a long time';
        }

        return '';
    }
    
    static dayIsToday(date: Date) {
        return dayjs(date).isToday();
    }
    
    static dayIsYesterday(date: Date) {
        return dayjs(date).isYesterday();
    }
    
    static getSinceDays(date: Date) {
        return dayjs(dayjs()).diff(date, 'day');
    }
    
    static getSinceWeeks(date: Date) {
        return dayjs(dayjs()).diff(date, 'week');
    }
    
    static getSinceMonths(date: Date) {
        return dayjs(dayjs()).diff(date, 'month');
    }
    
    static getSinceYears(date: Date) {
        return dayjs(dayjs()).diff(date, 'year');
    }
    

    // Navigation
    navegateTo(urlRoute: string): void {
        this.router.navigateByUrl('/' + urlRoute)
    }
}