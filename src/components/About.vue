<template>
  <v-card>
    <br />
    <p class="text-headline-large text-sm-display-medium text-center">URL Shorter</p>
    <v-divider inset />
    <br />
    <p class="text-body-1 text-center">
      Powered by
      <a href="https://dotnet.microsoft.com/apps/aspnet">ASP .Net Core</a> &amp;
      <a href="https://vuejs.org/">Vue.js</a>
    </p>
    <p class="text-body-1 text-center">
      Author: Gaojianli
      <github-button
        href="https://github.com/Gaojianli"
        aria-label="Follow @Gaojianli on GitHub"
      >Follow @Gaojianli</github-button>
    </p>
    <br />
    <p class="text-body-1 text-center">
      If this helps you, please give me a star:
      <github-button
        href="https://github.com/Gaojianli/UrlShorter"
        data-icon="octicon-star"
        aria-label="Star Gaojianli/UrlShorter on GitHub"
      >Star</github-button>
    </p>
    <br /><br />
  </v-card>
</template>

<script setup lang="ts">
import GithubButton from 'vue-github-button';
</script>
