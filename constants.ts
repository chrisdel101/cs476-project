export enum Routes {
    Index = '/',
    Login = '/log_in/:userType',
    Logout = '/log_out',
    Account = '/account'
}

export enum UserTypes {
    DONOR = 'donor',
    RECEIVER = 'receiver'
}

export enum ItemTypes {
    FOOD = 'food',
    CLOTHING = 'clothing',
    TOYS = 'toys',
    ELECTRONICS = 'electronics',
    MUSICAL_INSTRUMENTS = 'musical_instruments',
    BOOKS = 'books',
    GAMES = 'games',
    FURNITURE = 'furniture',
    HOUSEHOLD = 'household',
    AUTOMOTIVE = 'automotive',
    OTHER = 'other'
}
export enum ItemStates {
    AVAILABLE = 'available',
    PENDING = 'pending',
    DONATED = 'donated', // unavailable
    CLAIMED = 'claimed', // item is picked up and gone
}
export enum Locations {
    REGINA = 'regina',
    TEL_AVIV = 'tel_aviv',
    JERUSALEM = 'jerusalem',
    HAIFA = 'haifa',
    BEER_SHEVA = 'beer_sheva',
    NEW_YORK = 'new_york',
    LOS_ANGELES = 'los_angeles',
    LONDON = 'london',
    PARIS = 'paris',
    BERLIN = 'berlin',
    ROME = 'rome',
    TOKYO = 'tokyo',
    BEIJING = 'beijing',
    MOSCOW = 'moscow',
    SYDNEY = 'sydney'
}
export enum FunctionStatus {
    OK = 'ok',
    ERROR = 'error'
}
export enum Collections {
    DONORS = 'donors',
    RECEIVERS = 'receivers',
    ITEMS = 'items'
}
export enum AlertTypes {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   SUCCESS = 'success',
   DANGER = 'danger',
   WARNING = 'warning',
   INFO = 'info'
}
export enum Observers {
    INDEX = 'index',
    ACCOUNT = 'account',
    NAV = 'nav',
    NOTIFY = 'notify'
}
export enum Notifications {
    GET_ITEMS = 'get_items',
    GET_ITEMS_BY_USER = 'get_items_by_user',
}