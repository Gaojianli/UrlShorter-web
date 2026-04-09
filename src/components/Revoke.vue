<template>
  <v-container class="flex-column">
    <v-container class="flex-column">
      <p class="text-display-small text-sm-display-large text-center">Revoke URL</p>
      <br />
      <p class="text-body-1 text-center">
        You can revoke short url by input the revoke password.
      </p>
      <br /><br />
      <div class="flex-column">
        <v-form v-model="valid">
          <v-text-field
            v-model="shortUrl"
            hint="https://u2b.eu/xxxx"
            label="Short URL"
            variant="outlined"
            :rules="urlRule"
          />
          <v-text-field
            v-model="revokePwd"
            label="Revoke password"
            :rules="pwdRule"
            variant="outlined"
          />
        </v-form>
      </div>
      <div class="my-2 text-center">
        <v-btn size="large" color="error" @click="revoke()">Revoke</v-btn>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackBarText }}
      <template v-slot:actions>
        <v-btn :color="snackbarTextColor" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { API_URL } from '@/constants';

const valid             = ref(false);
const shortUrl          = ref('');
const snackBarText      = ref('');
const revokePwd         = ref('');
const snackbar          = ref(false);
const snackbarTextColor = ref('blue');

const urlRule = [
  (v: string) => (!!v && v.startsWith(API_URL)) || 'Please input the valid Short URL!',
];
const pwdRule = [
  (v: string) => !!v || 'Please input the revoke password!',
];

async function revoke() {
  if (valid.value) {
    try {
      const res  = await fetch(`${shortUrl.value}?revokePwd=${revokePwd.value}`, {
        method: 'DELETE',
        headers: { 'Content-Type': '; charset=utf-8' },
        credentials: 'same-origin',
      });
      const data = await res.json();
      if (data.code === 201) {
        snackBarText.value      = 'URL revoked!';
        snackbarTextColor.value = 'blue';
        snackbar.value          = true;
      } else if (data.code === 401) {
        snackBarText.value      = 'Invalid password!';
        snackbarTextColor.value = 'error';
        snackbar.value          = true;
        revokePwd.value         = '';
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }
}
</script>
