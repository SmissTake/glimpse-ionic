<template>
  <ion-item-sliding>
      <ion-item>
        <ion-label>{{placeTitle}}</ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option @click="editPlace(placeId)">Modifier</ion-item-option>
        <ion-item-option color="danger" @click="deletePlace(placeId)">Supprimer</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
</template>

<script lang="ts">

import { IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonItem, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logout } from '@/utils/auth';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();

export default defineComponent({
  name: 'PlaceItemManage',
  components: {
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonItem,
  },
  props: {
    placeTitle: {
      type: String,
      required: true,
    },
    placeId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const editPlace = (placeId: number) => {
      console.log('editPlace', placeId);
    };

    const deletePlace = (placeId: number) => {
      presentAlert()
      .then((role) => {
        if (role === 'confirm') {
          const token = localStorage.getItem('token');
          if (!token) {
            logout();
            return;
          }
          fetch(`${process.env.VUE_APP_API_URL}/place/delete/${placeId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log('deletePlace success');
              store.deletePostedPlace(placeId);
            }
            else {
              console.log('deletePlace error');
            }
          })
        }
        else {
          console.log('deletePlace canceled');
        }
      });
    };

    const presentAlert = async () => {
        const alert = await alertController.create({
          header: 'Souhaitez-vous vraiment supprimer ce lieu ?',
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
            },
            {
              text: 'Oui',
              role: 'confirm',
            },
          ],
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();

        return role;
      };

    return {
      editPlace,
      deletePlace,
    };
  },
});



</script>