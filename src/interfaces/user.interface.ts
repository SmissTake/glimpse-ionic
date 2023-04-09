import { Place } from './place.interface';

export interface User {
    id: number;
    pseudonym: string;
    biography: string | null;
    avatar: string;
    favoritePlaces: Place[] | null;
    postedPlaces: Place[] | null;
    followedUsers: User[] | null;
}