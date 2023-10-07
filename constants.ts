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
    CLOTHING = 'clothes',
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