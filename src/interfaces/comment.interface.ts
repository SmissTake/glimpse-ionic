import { User } from './user.interface';
import { Place } from './place.interface';
import { Picture } from './picture.interface';

export interface CommentPlace {
    id: number;
    comment: string;
    user: User;
    place: Place;
    created_at: string;
    PictureComments: Picture[] | null;
}