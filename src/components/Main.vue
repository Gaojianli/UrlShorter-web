<template>
  <v-container class="flex-column">
    <v-container class="flex-column">
      <p class="text-lg-h1 text-center text-h2">URL Shorter</p>
      <br />
      <p class="text-body-1 text-center">
        Tired of remembering long URL? Let me short it for you!
      </p>
      <br />
      <br />
      <v-form v-model="valid">
        <v-text-field
          label="Original URL"
          placeholder="Put long and boring url here"
          outlined
          :rules="rule"
          ref="urlInput"
          clearable
          v-model="longUrl"
        >
          <template v-slot:append v-if="clicked">
            <v-fade-transition leave-absolute>
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
              <v-icon color="green">mdi-check</v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-form>
      <div class="my-2 text-center">
        <v-btn large color="primary" @click="short()">Go！</v-btn>
      </div>
    </v-container>
    <!-- result container -->
    <v-container v-if="generated" class="flex-column mb-xs-8" >
      <v-card class="mx-auto" max-width="500px">
        <v-card-text>
          <p class="display-1 text--primary">It done!</p>
          <p>Here are your own short url.</p>
          <v-alert dense border="left" type="warning">
            Please remember the revoke password, it's the only way you can
            revoke this short url.
          </v-alert>
          <div class="flex-column">
            <v-text-field
              :value="shortUrl"
              label="Short URL"
              filled
              readonly
            ></v-text-field>
            <v-text-field
              :value="revokePwd"
              label="Revoke password"
              filled
              readonly
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="blue lighten-1"
            v-clipboard:copy="shortUrl"
            @click="snackbar = true"
            >Copy</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="2000">
      Copied!
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
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
export default class Main extends Vue {
  longUrl: string = '';

  revokePwd: string = '';

  shortUrl: string = '';

  valid = false;

  loading = false;

  clicked = false;

  snackbar = false;

  rule = [(v: string) => !!v || 'Please input the URL!'];

  generated = false;

  short() {
    if (this.valid) {
      this.loading = true;
      this.clicked = true;
      const urlencoded = new URLSearchParams();
      urlencoded.append('urls', this.longUrl);
      fetch(API_URL, {
        method: 'PUT',
        body: urlencoded,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 201) {
            this.shortUrl = data?.data?.shortUrl;
            this.revokePwd = data?.data?.revokePwd;
            this.generated = true;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      (this.$refs.urlInput as Element & { focus: () => void }).focus();
    }
  }
}
</script>
