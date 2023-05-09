import { Place } from "@/interfaces/place.interface";
import { User } from "@/interfaces/user.interface";
import { CommentPlace } from "@/interfaces/comment.interface";
import { Category } from "@/interfaces/category.interface";
import { Accessibility } from "@/interfaces/accessibility.interface";
import { Picture } from "@/interfaces/picture.interface";
import { defineStore } from "pinia";

export const usePlaceStore = defineStore("places", {
    state: () => ({
        places: [] as Place[],
        users: [] as User[],
        comments: [] as CommentPlace[],
        categories: [] as Category[],
        accessibilities: [] as Accessibility[],
        pictures: [] as Picture[],
        fetchError: "",
        successMessage: "",
    }),
    getters: {
        getPlaces: (state) => state.places,
        getUsers: (state) => state.users,
        getCategories: (state) => state.categories,
        getAccessibilities: (state) => state.accessibilities,
        getUser: (state) => (id: number) => state.users.find((user) => user.id === id),
    },
    actions: {
        async fetchPlaces() {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/place/listall`);
                this.setPlaces(await res.json());
                this.setFetchError('');
            } catch (error : any) {
                this.setFetchError(error.message + ' places');
            }
        },
        async fetchCategories() {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/category/listall`);
                this.setCategories(await res.json());
                this.setFetchError('');
            } catch (error : any) {
                this.setFetchError(error.message + ' categories');
            }
        },
        async fetchAccessibilities() {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/accessibility/listall`);
                this.setAccessibilities(await res.json());
                this.setFetchError('');
            }
            catch (error : any) {
                this.setFetchError(error.message + ' accessibilities');
            }
        },
        async fetchUser(id:number) {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/user/show/${id}`);
                this.setUser(await res.json());
                this.setFetchError('');
            }
            catch (error : any) {
                this.setFetchError(error.message + ' user');
            }
        },
        setPlaces(places: Place[]) {
            this.places = places;
        },
        setCategories(categories: Category[]) {
            this.categories = categories;
        },
        setAccessibilities(accessibilities: Accessibility[]) {
            this.accessibilities = accessibilities;
        },
        setUser(user: User) {
            if(!this.users.find((u) => u.id === user.id))
            this.users.push(user);
        },
        setFetchError(error: string) {
            this.fetchError = error;
        },
        setSuccessMessage(message: string) {
            this.successMessage = message;
        },
    }
})