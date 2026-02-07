<script setup lang="ts">
import TheList from "@/components/TheList.vue";
</script>

<template>
  <div class="app">
    <TheList />
  </div>
</template>

<style>
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  min-height: 100svh;
  background: #eaf2f8; /* kjølig lys blå */
}
</style>
