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
    }),
    getters: {
        getPlaces: (state) => state.places,
        getUsers: (state) => state.users,
    },
    actions: {
        async fetchPlaces() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/place/listall`);
            this.places = await res.json();
            await this.setPlaces(this.places);
        },
        setPlaces(places: Place[]) {
            this.places = places;
        },
    }
})