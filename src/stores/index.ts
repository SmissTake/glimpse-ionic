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
            const res = await fetch(`${process.env.VUE_APP_API_URL}/place/listall`);
            this.setPlaces(await res.json());
        },
        async fetchCategories() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/category/listall`);
            this.setCategories(await res.json());
        },
        async fetchAccessibilities() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/accessibility/listall`);
            this.setAccessibilities(await res.json());
        },
        async fetchUser(id:number) {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/user/show/${id}`);
            this.setUser(await res.json());
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
        }
    }
})