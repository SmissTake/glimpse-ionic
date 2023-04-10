import { User } from './user.interface';
import { Place } from './place.interface';
import { Picture } from './picture.interface';

export interface CommentPlace {
    id: number;
    comment: string;
    User: User;
    Place: Place;
    created_at: string;
    PictureComments: Picture[] | null;
}