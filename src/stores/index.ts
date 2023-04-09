import { Place } from "@/interfaces/place.interface";
import { User } from "@/interfaces/user.interface";
import { Comment } from "@/interfaces/comment.interface";
import { Category } from "@/interfaces/category.interface";
import { Accessibility } from "@/interfaces/accessibility.interface";
import { Picture } from "@/interfaces/picture.interface";
import { defineStore } from "pinia";

export const usePlaceStore = defineStore("places", {
    state: () => ({
        places: [] as Place[],
        users: [] as User[],
        comments: [] as Comment[],
        categories: [] as Category[],
        accessibilities: [] as Accessibility[],
        pictures: [] as Picture[],
    }),
    getters: {
        getPlaces: (state) => state.places,
        getUsers: (state) => state.users,
        getPlaceById(state: any) {
            return (id: number) => state.places.find((place: Place) => place.id === id);
        }
    },
    actions: {
        async fetchPlaces() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/place/listall`);
            this.places = await res.json();
        },
        async fetchPlace(id: number) {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/place/show/${id}`);
            this.places = await res.json();
        }
    }
})