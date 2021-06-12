import { GlobalUtil } from "../shared/global.util";

export class Palette {
    constructor(
        public _id: string,
        public colours: string[],
        public title?: string,
        public likes?: number,
        public tags?: string[],
        public isFamous?: boolean,
        public isPendingApproval?: boolean,
        public createdAt?: Date | string,
        public updatedAt?: Date | string,
        public liked?: boolean,
        public since?: string,
    ) {
        liked = false;
    }
}

export class PalettePaginate {
    constructor(
        public items: Palette[],
        public totalItems: number,
        public totalPages: number,
        public currentPage: number,
        public lastPage: number,
        public nextPage: number,
        public pagesNumber: number[]
    ) { }
}

export class PaletteHelper {
    static DefaultObject(): Palette {
        return new Palette('', this.AleatoryHEXColor(4), '', 0, [], false, true, new Date(), new Date(), false)
    }

    static AleatoryHEXColor(colorNumbers: number = 1): any {
        const letters: string[] = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];

        let colors: string[] = [];
        for (let index = 0; index < colorNumbers; index++) {
            let color = "";
            for(var i=0;i<6;i++) {
                color += letters[parseInt((Math.random()*15).toFixed(0), 10)];
            }
            colors.push(`#${color}`)
        }

        return colors.length === 1 ? colors[0] : colors;
    }

    static mapToObject(response: any) {
        return new Palette(
            response._id,
            response.colours,
            response.title,
            response.likes,
            response.tags,
            response.isFamous,
            response.isPendingApproval,
            response.createdAt,
            response.updatedAt,
            response.liked,
            GlobalUtil.getSinceFromDate(response.createdAt)
        )
    }

    static mapToObjectList(response: any): any {
        if (response && response !== null && response !== undefined) {
            const items: any = [];
            const itemsToTransform: any = response.data || response;
            itemsToTransform.forEach((item: any) => {
                items.push(this.mapToObject(item))
            });

            return items;
        }
        return [];
    }
}

export class PalettePaginateHelper {
    static DefaultObject(): PalettePaginate {
        return new PalettePaginate([], 0, 0, 1, 0, 0, [])
    }

    static mapToObject(response: any) {
        return new PalettePaginate(
            PaletteHelper.mapToObjectList(response.items),
            response.totalItems,
            response.totalPages,
            response.currentPage,
            response.lastPage,
            response.nextPage,
            []
        )
    }
}