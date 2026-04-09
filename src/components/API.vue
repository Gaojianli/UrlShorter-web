<template>
  <v-container>
    <!-- v-html is safe here: content is from a local static asset, not user input -->
    <div class="markdown-body" v-html="renderedHtml" />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import 'github-markdown-css/github-markdown.css';
import md from '@/utils/markdown';
import Apidoc from '@/assets/APIDoc.md?raw';

const renderedHtml = computed(() => md.render(Apidoc));
</script>
