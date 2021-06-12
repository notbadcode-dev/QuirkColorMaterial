import { environment } from "./environment";

export const Enspoints = {

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