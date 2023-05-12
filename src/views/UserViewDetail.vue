<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getAnnouncementById } from '../assets/data.js'
import router from '../router/index.js'
const { params } = useRoute()
const announcement = ref('')
onBeforeMount(async () => {
    announcement.value = await getAnnouncementById(params.id)

})

const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
const dateformat = (date) => {
    if (date === null) {
        return "-"
    } else {
        let mydate = new Date(date)
        //  let timezone = mydate.getTimezoneOffset() * 60 * 1000;
        //   const localDate = new Date(mydate.getTime() - timezone);
        return mydate.toLocaleDateString('en-GB', options)
    }
}

</script>

<template>
    <div class="w-screen font-noto">
        <div v-if="announcement" class="w-full h-full flex flex-col justify-center items-center px-4 py-2">
            <h1 class="text-left text-3xl mb-4 text-custom-black">Announcement Detail:</h1>
            <div class="border rounded-md flex flex-col justify-center w-5/6">
                <div class="p-4">
                    <h1 class="font-bold text-xl">{{ announcement.announcementTitle }}</h1>
                    <div class="flex flex-row justify-between">
                        <p class="text-gray-400 font-bold text-base">{{ announcement.announcementCategory }}</p>
                        <p v-if="announcement.closeDate" class="text-gray-400">
                            <span class="text-red-500 font-bold">Closed on : </span>
                            {{ dateformat(announcement.closeDate) }}
                        </p>
                    </div>
                </div>
                <hr>
                <div class="p-4">
                    <p class="font-bold text-sm">{{ announcement.announcementDescription }}</p>
                </div>
                <hr>
                <button @click="router.push('/announcement')"
                    class="rounded-md text-center text-base bg-gray-200 m-4 w-20 h-10 text-custom-black font-bold ann-button">
                    Back
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
tr {
    padding: 10px;
}

td {
    padding: 10px;
}
</style>