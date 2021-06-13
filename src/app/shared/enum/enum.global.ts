export enum EParentView {
    notFound = 0,
    list = 10,
    palette = 20,
    about = 99
}

export enum EView {
    notFound = 0,
    allList = 10,
    famousList = 11,
    likesList = 12,
    newPalette = 20,
    detailPalette = 21,
    editPalette = 22,
    about = 99,
}

export enum EPaletteActions {
    delete = 0,
    create = 1,
    update = 2,
}

export enum ToastTypeClass {
    default = '',
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error',
    critical = 'critical'
}

export enum MessageType {
    default = 0,
    permission = 5,
    info = 10,
    success = 15,
    warning = 20,
    error = 25,
    critical = 90
};