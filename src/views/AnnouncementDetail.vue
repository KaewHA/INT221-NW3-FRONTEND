<script setup>
import { ref,onBeforeMount } from 'vue';
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
    <div class="w-screen h-screen font-noto">
        <div v-if="announcement" class="w-full h-full flex-row justify-center items-center px-4 py-2">
            <h1 class="text-left text-3xl mb-4 text-custom-black">Announcement Detail:</h1>
            <div class="border rounded-sm flex justify-center items-center">
                <table class="w-full h-full my-2 text-custom-black ann-item">
                    <tr class="ann-title">
                        <td class="font-bold">Title</td>
                        <td>{{ announcement.announcementTitle }}</td>
                    </tr>
                    <tr class="ann-category">
                        <td class="font-bold">Category</td>
                        <td>{{ announcement.announcementCategory }}</td>
                    </tr>
                    <tr class="ann-description">
                        <td class="font-bold">Description</td>
                        <td>{{ announcement.announcementDescription }}</td>
                    </tr>
                    <tr class="ann-publish-date">
                        <td class="font-bold">Publish Date</td>
                        <td>{{ dateformat(announcement.publishDate) }}</td>
                    </tr>
                    <tr class="ann-close-date">
                        <td class="font-bold">Close Date</td>
                        <td>{{ dateformat(announcement.closeDate) }}</td>
                    </tr>
                    <tr class="ann-display">
                        <td class="font-bold">Display</td>
                        <td :class="announcement.announcementDisplay == 'Y' ? 'text-green-700' : 'text-red-600'">{{
                            announcement.announcementDisplay }}</td>
                    </tr>
                </table>
            </div>
            <router-link :to="{ path: '/admin/announcement/' }">
                <button class="rounded-md text-center text-lg bg-gray-200 my-2 w-20 h-10 text-custom-black ann-button mr-6">Back</button>
            </router-link>
            <router-link :to="{ path: `/admin/announcement/${params.id}/edit` }">
                <button class="rounded-md text-center text-lg  my-2 w-20 h-10 bg-sky-600 text-white ann-button">Edit</button>
            </router-link>
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