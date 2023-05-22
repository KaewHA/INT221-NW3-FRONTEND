<script setup>
import router from '../router/index.js'
import back from '../components/icon/next.vue'
// router.push('/admin/announcement')
</script>
 
<template>
<div class="w-screen h-screen bg-sky-600 font-noto">
<div class="w-full h-full border flex justify-center items-center">
    <div class="flex-col">
    <div class="flex justify-center items-center ">
    <img src="/images/logo.png" class="w-1/6 h-auto mr-12">
    <p class="text-9xl text-white font-noto">SIT</p>
    <p class="text-4xl text-white font-noto">Announcement System</p>
    </div>
    <div class=" space-x-6 flex justify-center ml-96  -mt-16">
    <button class=" rounded-md text-center text-lg bg-sky-600 border  my-2 w-20 h-10 text-white ann-button  hover:bg-sky-400" @click="router.push('/admin/announcement')">
        <back class="x"></back><span class="y">Admin</span>
    </button>
    <button class=" rounded-md text-center text-lg bg-sky-600 border  my-2 w-20 h-10 text-white ann-button  hover:bg-sky-400" @click="router.push('/announcement')">
        <back class="x"></back><span class="y">User </span>
    </button>
    <!-- <button class=" rounded-md text-center text-lg bg-sky-600 border  my-2 w-20 h-10 text-white ann-button  hover:bg-sky-400" @click="router.push('/ui/announcement')">
        <back class="x"></back><span class="y">User2</span>
    </button> -->
</div>
</div>
</div>
<div>
    
</div>
</div>
</template>
 
<style scoped>
.ann-button:hover  .x{
    display: inline;
}

.ann-button:hover  .y{
    display: none;
}

.ann-button .x{
    display: none;
}
.ann-button .y{
    display: inline;
}
</style>