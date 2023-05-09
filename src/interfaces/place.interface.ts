import { User } from './user.interface';
import { Category } from './category.interface';
import { Accessibility } from './accessibility.interface';
import { Picture } from './picture.interface';
import { CommentPlace } from './comment.interface';

export interface Place {
    id: number;
    title: string;
    created_at: string;
    description: string;
    history: string | null;
    town: string | null;
    keyword: string;
    PicturePlaces: Picture[];
    postedBy: User;
    Category: Category;
    Accessibility: Accessibility;
    Comments: CommentPlace[] | null;
    FavoriteUsers: [] | null;
}