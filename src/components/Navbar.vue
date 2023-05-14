<script setup>
import earth from './icon/SystemUiconsGlobe.vue'
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<template>
    <div class="w-screen font-noto rounded-2xl">
        <div class="w-full h-full flex p-2 bg-slate-100">
            <div class="flex h-full flex-col w-1/2 px-10 py-2 max-md:w-full">
                <div class="flex flex-row space-x-2">
                    <h1 class="text-5xl font-semibold text-custom-black">SAS</h1>
                    <img src="/images/sit.png" alt="" class="h-11 w-11">
                </div>
                <h2 class="text-2xl font-extrabold text-custom-blue">
                    SIT Announcement System
                </h2>
                <h1 class="text-custom-black flex">
                        <span class="font-bold">Date/Time Show in Timezone :</span><earth class=""></earth>
                        {{ timezoneName }}
                    </h1>
            </div>
        </div>
    </div>
    <hr>
</template>

<style scoped></style>
