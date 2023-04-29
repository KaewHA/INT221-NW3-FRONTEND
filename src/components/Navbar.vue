<script setup>
import { ref } from 'vue';

const isHamToggle = ref(false)
const showHam = () => {
    isHamToggle.value = !isHamToggle.value
}
</script>

<template>
    <div class="w-screen font-noto">
        <div class="w-full h-full flex p-2 bg-slate-200">
            <div class="flex h-full flex-col w-1/2 px-10 py-2 max-md:w-full">
                <div class="flex flex-row space-x-2">
                    <h1 class="text-5xl font-semibold">SAS</h1>
                    <img src="/images/sit.png" alt="" class="h-11 w-11">
                </div>
                <h2 class="text-2xl font-extrabold text-custom-blue">
                    SIT Announcement System
                </h2>
                <!-- responsive -->
                <img @click="showHam" src="/icons/menu.svg" alt="" class="h-5 w-5 md:hidden self-center mt-2">
                <ul v-if="isHamToggle" class="flex flex-col w-full h-full justify-center p-4 font-semibold text-center md:hidden">
                    <li class="p-5 w-full h-full hover:text-custom-blue cursor-pointer">ทั่วไป</li>
                    <li class="p-5 w-full h-full hover:text-custom-blue cursor-pointer">ทุนการศึกษา</li>
                    <li class="p-5 w-full h-full hover:text-custom-blue cursor-pointer">หางาน</li>
                    <li class="p-5 w-full h-full hover:text-custom-blue cursor-pointer">ฝึกงาน</li>
                </ul>
                <!--  -->
            </div>
            <ul class="flex w-1/2 h-full justify-center p-4 font-semibold text-center max-md:hidden">
                <li class="p-5 w-1/4 h-full hover:text-custom-blue cursor-pointer">ทั่วไป</li>
                <li class="p-5 w-1/4 h-full hover:text-custom-blue cursor-pointer">ทุนการศึกษา</li>
                <li class="p-5 w-1/4 h-full hover:text-custom-blue cursor-pointer">หางาน</li>
                <li class="p-5 w-1/4 h-full hover:text-custom-blue cursor-pointer">ฝึกงาน</li>
            </ul>
        </div>
    </div>
    <hr>
</template>

<style scoped></style>
