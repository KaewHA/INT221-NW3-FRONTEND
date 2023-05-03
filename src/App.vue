<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="w-screen h-screen ">
    <Navbar></Navbar>
    <router-view>
    </router-view>
  </div>
</template>

<style scoped></style>
