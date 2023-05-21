<script setup>
import router from '../router';

</script>
 
<template>
    <div class="w-screen h-screen flex justify-center items-center flex-col space-y-8">
        <img src="" alt="">
        <h1 class="text-9xl text-center font-extrabold animate-pulse fof">
            <span class="text-sky-600">4</span>
            <span class="text-sky-300">0</span>
            <span class="text-sky-600">4</span>
        </h1>
        <h1 class="text-7xl text-center flex">Page Not Found!</h1>
        <button @click="router.push('/')" class="text-2xl rounded-2xl p-4 bg-sky-600 w-72 h-16 flex flex-col text-white items-center justify-center but">
            <p class="a">Back to home page!</p>
            <img src="/icons/home.svg" alt="" class="h-10 w-10 b">
        </button>
    </div>
</template>
 
<style scoped>
.fof {
    
}

.but .b {
    display: none;
}

.but:hover .b {
    display: inline;
}

.but:hover .a {
    display: none;
}
</style>