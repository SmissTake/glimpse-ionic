import { User } from './user.interface';
import { Category } from './category.interface';
import { Accessibility } from './accessibility.interface';
import { Picture } from './picture.interface';
import { CommentPlace } from './comment.interface';

export interface Place {
    id: number;
    title: string;
    createdAt: string;
    description: string;
    history: string | null;
    town: string | null;
    keyword: string;
    picturePlaces: Picture[];
    postedBy: User;
    category: Category;
    accessibility: Accessibility;
    comments: CommentPlace[] | null;
    favoriteUsers: User[] | null;
}