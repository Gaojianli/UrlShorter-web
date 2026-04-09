<template>
  <v-container class="flex-column">
    <v-container class="flex-column">
      <p class="text-display-small text-sm-display-large text-center">URL Shorter</p>
      <br />
      <p class="text-body-1 text-center">
        Tired of remembering long URL? Let me short it for you!
      </p>
      <br />

      <div class="flex-center">
        <div>Choose your protocol:</div>
        <v-radio-group v-model="prefix" inline>
          <v-radio
            v-for="r in radioes"
            :key="r.comments"
            :label="r.comments"
            :value="r.prefix"
          />
        </v-radio-group>
      </div>
      <br />

      <v-form v-model="valid">
        <v-text-field
          v-model="longUrl"
          label="Original URL"
          placeholder="Put long and boring url here"
          variant="outlined"
          :rules="rule"
          :prefix="prefix"
          ref="urlInput"
          hide-details="auto"
          clearable
        >
          <template v-if="clicked" v-slot:append-inner>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              />
              <v-icon v-else color="green">mdi-check</v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-form>

      <div class="my-2 text-center">
        <v-btn size="large" color="primary" @click="short()">Go!</v-btn>
      </div>
    </v-container>

    <v-container v-if="generated" class="flex-column mb-xs-8">
      <v-card class="mx-auto" max-width="500px">
        <v-card-text>
          <p class="text-h4 text-primary">It done!</p>
          <p>Here are your own short url.</p>
          <v-alert density="compact" border="start" type="warning">
            Please remember the revoke password, it's the only way you can
            revoke this short url.
          </v-alert>
          <div class="flex-column">
            <v-text-field
              :model-value="shortUrl"
              label="Short URL"
              variant="filled"
              readonly
            />
            <v-text-field
              :model-value="revokePwd"
              label="Revoke password"
              variant="filled"
              readonly
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="blue-lighten-1" @click="copyShortUrl()">
            Copy
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000">
      Copied!
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import copy from 'copy-to-clipboard';
import { API_URL } from '@/constants';

const longUrl   = ref('');
const revokePwd = ref('');
const shortUrl  = ref('');
const valid     = ref(false);
const loading   = ref(false);
const clicked   = ref(false);
const snackbar  = ref(false);
const generated = ref(false);
const prefix    = ref(' ');
const urlInput  = ref<HTMLElement | null>(null);

const rule = [(v: string) => !!v || 'Please input the URL!'];

const radioes = [
  { prefix: ' ',        comments: 'Customize' },
  { prefix: 'https://', comments: 'https://' },
  { prefix: 'http://',  comments: 'http://'  },
];

function copyShortUrl() {
  copy(shortUrl.value);
  snackbar.value = true;
}

async function short() {
  if (valid.value) {
    loading.value = true;
    clicked.value = true;
    const urlencoded = new URLSearchParams();
    let toShort = longUrl.value;
    if (prefix.value === 'https://' || prefix.value === 'http://') {
      if (!longUrl.value.startsWith(prefix.value)) {
        toShort = prefix.value + longUrl.value;
      }
    }
    urlencoded.append('urls', toShort);
    try {
      const res  = await fetch(API_URL, {
        method: 'PUT',
        body: urlencoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      });
      const data = await res.json();
      if (data.code === 201) {
        shortUrl.value  = data?.data?.shortUrl;
        revokePwd.value = data?.data?.revokePwd;
        generated.value = true;
        loading.value   = false;
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  } else {
    urlInput.value?.focus();
  }
}
</script>
