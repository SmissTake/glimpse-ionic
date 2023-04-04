<template>
    <ion-row>
        <ion-item>
          <ion-input label="Commentaire" label-placement="stacked" placeholder="Ajouter un commentaire"></ion-input>
        </ion-item>
        <ion-button>
            <ion-icon slot="icon-only" :icon="sendOutline"></ion-icon>
        </ion-button>
    </ion-row>
</template>

<script lang="ts">
import { IonItem, IonInput, IonRow, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { sendOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'CommentInput',
    components: {
        IonItem,
        IonInput,
        IonRow,
        IonButton,
    },
    data() {
        return {
            sendOutline,
        };
    },
});
</script>