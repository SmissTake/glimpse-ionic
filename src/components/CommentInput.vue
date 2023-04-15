<template>
    <ion-row>
        <ion-item>
          <ion-input label="Commentaire" label-placement="stacked" placeholder="Ajouter un commentaire"></ion-input>
        </ion-item>
        <ion-button @click="postComment">
            <ion-icon slot="icon-only" :icon="sendOutline"></ion-icon>
        </ion-button>
    </ion-row>
</template>

<script lang="ts">
import { IonItem, IonInput, IonRow, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { sendOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'CommentInput',
    components: {
        IonItem,
        IonInput,
        IonRow,
        IonButton,
        IonIcon,
    },
    props: {
        idPlace: {
            type: Number,
            required: true,
        },
    },
    methods: {
        postComment() {
            //get data from input
            if(!document.querySelector('ion-input')) return;
            if(!document.querySelector('ion-input')?.value) return;
            const comment = document.querySelector('ion-input')?.value;
            console.log('postComment: ' + comment + ' for place ' + this.idPlace);
        },
    },
    data() {
        return {
            sendOutline,
        };
    },
});
</script>