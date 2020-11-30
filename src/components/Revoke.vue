<template>
  <v-container class="flex-column">
    <v-container class="flex-column">
      <p class="text-lg-h1 text-center text-h2">Revoke URL</p>
      <br />
      <p class="text-body-1 text-center">
        You can revoke short url by input the revoke password.
      </p>
      <br />
      <br />
      <div class="flex-column">
        <v-form v-model="vaild">
          <v-text-field
            v-model="shortUrl"
            hint="https://u2b.eu/xxxx"
            label="Short URL"
            outlined
            :rules="urlRule"
          ></v-text-field>
          <v-text-field
            v-model="revokePwd"
            label="Revoke password"
            :rules="pwdRule"
            outlined
          ></v-text-field>
        </v-form>
      </div>
      <div class="my-2 text-center">
        <v-btn large color="error" @click="revoke()">Revoke</v-btn>
      </div>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snakBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="snakbarTextColor" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { API_URL } from '@/config.ts';

@Component
export default class Revoke extends Vue {
  vaild = false;

  shortUrl = '';

  snakBarText = '';

  revokePwd = '';

  snackbar = false;

  snakbarTextColor = 'blue'

  urlRule = [
    (v: string) => (!!v && v.startsWith(API_URL)) || 'Please input the vaild Short URL!',
  ];

  pwdRule = [
    (v: string) => !!v || 'Please input the revoke password!',
  ];

  revoke() {
    if (this.vaild) {
      fetch(`${this.shortUrl}?revokePwd=${this.revokePwd}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': '; charset=utf-8',
        },
        credentials: 'same-origin',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 201) {
            this.snakBarText = 'URL revoked!';
            this.snakbarTextColor = 'blue';
            this.snackbar = true;
          } else if (data.code === 401) {
            this.snakBarText = 'Invaild password!';
            this.snakbarTextColor = 'error';
            this.snackbar = true;
            this.revokePwd = '';
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
}
</script>
