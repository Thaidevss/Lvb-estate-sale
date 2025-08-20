<script setup>
import LoadingSpinner from "../../components/common/Loading.vue";

import { ref } from "vue";

const loading = ref(true);
</script>

<template>
  <div class="h-screen">
    <h1>Test Page</h1>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
  </div>
</template>
