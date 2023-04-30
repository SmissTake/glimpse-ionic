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
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc0lkIjo1LCJuYW1lIjoidXNlci01IiwibWFpbCI6ImFkcmVzcys1QG1haWwuY29tIiwiYWNjZXNzVHlwZXMiOlsiVXRpbGlzYXRldXIiXSwiaWF0IjoxNjgyODYwMTM4LCJleHAiOjE2ODI4OTYxMzh9.o56Bpbd2jagStSjZ-zjhln_enucc5v1NS19GANE0g4j7q1YnLdycZZ3e6s-uv-BNhRmYz5LoDQAKYe5dNbfH1Xoz0SD9It83Z6ncIdf1KjaZQMpHECY8Glg5bvuVSdsKr8nCf8HGBCWaemcXzyfy66ip5HbQndGkhGat8niOec2afEpgFeh8D4rrG22enw4iaOu-sizehxaR6rPs-wc9AH1hNS3lOPclYZBjACf5YJ4q7QlqdnkyL8ZV29QCNKlhlJUMT4xmYf6I7MN4QtxpXOKarSutdRRENPBKuz1PoEpz2lBQWykIUSpBzZvUXkU0ZB08K71IgMe55O64wAY4Xw",
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
                this.fetchError = '';
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
        setToken(token: string) {
            this.token = token;
        },
    }
})