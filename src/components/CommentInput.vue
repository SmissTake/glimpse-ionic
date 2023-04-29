<template>
    <ion-row>
        <form @submit="submitComment">
            <ion-item>
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
      @ionToastDidDismiss="store.fetchError = null"
      v-if="store.fetchError"
    ></ion-toast>
    <ion-toast
      :message="store.successMessage"
      position="bottom"
      color="success"
      :duration="4000"
      @ionToastDidDismiss="store.successMessage = null"
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
    methods: {
        onInput(event: any) {
            const name = event.target.name;
            const value = event.target.value.trim();
            if(value === '') return;
            this.commentForm = { ...this.commentForm, [name]: value };
            console.log(this.commentForm);
        },
        submitComment() {
            const data = new FormData();
            data.append('comment', this.commentForm.comment);
            data.append('usersId', this.commentForm.usersId);
            data.append('placesId', JSON.stringify(this.commentForm.placesId));

            fetch(`${process.env.VUE_APP_API_URL}/comment/create`, {
                method: 'POST',
                body: data,
            })
            .then((response) => response.json())
            .then((data) => {
                store.setSuccessMessage("Votre commentaire a bien été ajouté !");
                console.log('Success:', data);
            })
            .catch((error) => {
                store.setFetchError("Une erreur est survenue");
                console.error('Error:', error);
            });
        },
    },
    data() {
        return {
            sendOutline,
            commentForm: {
                comment: '',
                images: [],
                usersId: `${process.env.VUE_APP_USER_ID}`,
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
    }

    ion-button {
        --background: var(--ion-color-primary);
        --color: var(--ion-color-secondary-contrast);
        border-radius: 0.5em;
    }

    ion-input {
    --placeholder-color: #ddd;
    --placeholder-opacity: .8;
    --border-radius: 0.5em;
  }

  ion-input {
    color: var(--ion-color-step-700, #373737);
  }
</style>