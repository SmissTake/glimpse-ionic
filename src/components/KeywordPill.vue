<template>
    <ion-chip>
        <p>
            {{ keyword }}
        </p>
    </ion-chip>
</template>

<script lang="ts">
import { IonChip } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'KeywordPill',
    components: { IonChip },
    props: {
        keyword: {
            type: String,
            required: true,
        },
    },
});

</script>

<style scoped>
    ion-chip {
        --background: var(--ion-color-secondary);
        --color: var(--ion-color-secondary-contrast);
        border-radius: 0.5em;
    }

    /* ion chip text in  --font: var(--ion-text-paragraph); */
    ion-chip p {
        font: var(--ion-text-paragraph);
    }
</style>