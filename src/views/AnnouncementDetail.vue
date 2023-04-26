<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router/index.js'
import { getAnnouncementById } from '../assets/data.js'

const { params } = useRoute()
const announcement = ref('')
onMounted(async () => {
    announcement.value = await getAnnouncementById(params.id)
})

const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
const dateformat = (date) => {
  if (date === null) {
    return "-"
  } else {
    let mydate = new Date(date)
    let timezone = mydate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(mydate.getTime() - timezone);
    return localDate.toLocaleDateString('en-US', options)
  }
}

</script>

<template>
    <div class="w-screen h-screen">
        <div class="w-full h-full flex-row justify-center items-center px-4 py-2">
            <h1 class="text-center text-3xl mb-4">Announcement Detail:</h1>
            <div class="border rounded-sm flex justify-center items-center">
                <table class="w-full h-full ">
                    <tr>
                        <td>Title</td>
                        <td>{{ announcement.announcementName }}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{{ announcement.categoryName }}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{{ announcement.announcementDes }}</td>
                    </tr>
                    <tr>
                        <td>Publish Date</td>
                        <td>{{ dateformat(announcement.publishDate) }}</td>
                    </tr>
                    <tr>
                        <td>Close Date</td>
                        <td>{{ dateformat(announcement.closeDate) }}</td>
                    </tr>
                    <tr>
                        <td>Display</td>
                        <td :class="announcement.annonuncementDisplay=='Y'?'text-green-700':'text-red-600'">{{ announcement.annonuncementDisplay }}</td>
                    </tr>
                </table>
            </div>
            <router-link :to="{name: 'Announcement'}">
                <button class="rounded-md text-center text-lg bg-gray-200 my-2 p-2">Back</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .tr {
        padding: 10px;
        margin-bottom: 0.75rem;
    }
    .td {
        padding: 10px;
        margin-bottom: 5.75rem
    }
</style>
<!-- localhost:4321/api/anno -->