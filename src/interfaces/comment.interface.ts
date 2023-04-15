import { User } from './user.interface';
import { Place } from './place.interface';
import { Picture } from './picture.interface';

export interface CommentPlace {
    id: number;
    comment: string;
    postedBy: User;
    Place: Place;
    created_at: string;
    PictureComments: Picture[] | null;
}