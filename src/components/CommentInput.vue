<template>
    <ion-row>
        <form @submit.prevent="submitComment">
            <ion-item class="custom">
                <ion-input 
                label="Commentaire"
                label-placement="stacked"
                placeholder="Ajouter un commentaire"
                name="comment"
                :required="true"
                :value="commentForm.comment"
                @ionInput="onInput($event)"></ion-input>
            </ion-item>
            <ion-button v-if="commentForm.comment != ''" type="submit">
                <ion-icon slot="icon-only" :icon="sendOutline"></ion-icon>
            </ion-button>
            <ion-button v-if="commentForm.comment == ''" type="submit" disabled>
                <ion-icon slot="icon-only" :icon="sendOutline"></ion-icon>
            </ion-button>
        </form>
    </ion-row>
    <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError = ''"
      v-if="store.fetchError"
    ></ion-toast>
    <ion-toast
      :message="store.successMessage"
      position="bottom"
      color="success"
      :duration="4000"
      @ionToastDidDismiss="store.successMessage = ''"
      v-if="store.successMessage"
    ></ion-toast>
</template>

<script lang="ts">
import { IonItem, IonInput, IonRow, IonButton, IonIcon, IonToast } from '@ionic/vue';
import { defineComponent } from 'vue';
import { sendOutline } from 'ionicons/icons';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();

export default defineComponent({
    name: 'CommentInput',
    components: {
        IonItem,
        IonInput,
        IonRow,
        IonButton,
        IonIcon,
        IonToast,
    },
    props: {
        idPlace: {
            type: Number,
            required: true,
        },
    },
    emits: ['commentPosted'],
    methods: {
        onInput(event: any) {
            const name = event.target.name;
            const value = event.target.value.trim();
            if(value === '') return;
            this.commentForm = { ...this.commentForm, [name]: value };
        },
        submitComment() {
            const data = new FormData();
            data.append('comment', this.commentForm.comment);
            data.append('placesId', JSON.stringify(this.commentForm.placesId));

            const token = localStorage.getItem('token');

            fetch(`${process.env.VUE_APP_API_URL}/comment/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data,
            })
            .then((response) => response.json())
            .then((data) => {
                store.setSuccessMessage("Votre commentaire a bien été ajouté !");
                this.commentForm = { ...this.commentForm, comment: '' };
                console.log('Success:', data);
                this.$emit('commentPosted');
                //reset the success message after toast duration
                setTimeout(() => {
                    store.setSuccessMessage("");
                }, 4000);
            })
            .catch((error) => {
                store.setFetchError("Une erreur est survenue");
                console.error('Error:', error);
                //reset the error message after toast duration
                setTimeout(() => {
                    store.setFetchError("");
                }, 4000);
            });
        },
    },
    data() {
        return {
            sendOutline,
            commentForm: {
                comment: '',
                images: [],
                placesId: this.idPlace,
            },
            store
        };
    },
});
</script>

<style scoped>

    form {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 1em;
    }

    ion-button {
        --background: var(--ion-color-primary);
        --color: var(--ion-color-secondary-contrast);
        border-radius: 0.5em;
        height: 100%;
        margin: 0;
    }

    ion-item.custom {
        margin-top: 0;
        width: 100%;
    }
</style>