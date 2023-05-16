export interface Category {
    id: number;
    label: string;
    avatar: string;
    numberPlaces: number;
    Place: {
        id: number;
        numberLike: number;
        PicturePlaces: [{
            url: string;
        }]
    }
}