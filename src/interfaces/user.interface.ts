import { Place } from './place.interface';

export interface User {
    id: number;
    pseudonym: string;
    biography: string | null;
    avatar: string;
    FavoritePlaces: Place[] | null;
    posted: Place[] | null;
    followedUsers: User[] | null;
}