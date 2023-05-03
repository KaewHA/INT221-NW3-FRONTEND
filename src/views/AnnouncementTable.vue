<script setup>
import { ref, onBeforeMount } from "vue";
import { getAnnouncement } from "../assets/data.js";
import router from '../router/index.js'
onBeforeMount(async () => {
    const receivedData = ref([]);
    receivedData.value = await getAnnouncement();
    receivedData.value.forEach((x) => allAnnouncement.value.push(x));
});

const allAnnouncement = ref([]);
const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
};

const dateformat = (date) => {
    if (date === null) {
        return "-";
    } else {
        let mydate = new Date(date);
        return mydate.toLocaleDateString("en-GB", options);
    }
};
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

</script>

<template>
    <div class="w-screen h-screen">
        <div class="h-full flex justify-center">
            <div v-if="allAnnouncement.length != 0" class="font-noto w-full p-8">
                <div class="w-full flex flex-row justify-between mt-2 mb-3">
                    <h1 class="text-custom-black">
                        <span class="font-bold">Date/Time Show in Timezone :</span>
                        {{ timezoneName }}
                    </h1>
                    <button class="rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white" @click="router.push('/admin/announcement/add')">Add Announcement</button>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <table class="w-full border">
                        <tr class="sticky top-0 bg-cyan-600 border text-white">
                            <th class="text-left">No.</th>
                            <th class="text-left pr-6">Title</th>
                            <th class="text-left">Category</th>
                            <th class="text-left">Publish Date</th>
                            <th class="text-left">Close Date</th>
                            <th class="">Display</th>
                            <th class="py-1">Action</th>
                        </tr>
                        <tr v-for="(announcement, index) in allAnnouncement" :key="index" class="overflow-auto" :class="index%2!==0?'bg-slate-50':'bg-white'">
                            <td class="">
                                {{ index + 1 }}
                            </td>
                            <td class="">
                                {{ announcement.announcementTitle }}
                            </td>
                            <td class="">
                                {{ announcement.announcementCategory }}
                            </td>
                            <td class="">
                                {{ dateformat(announcement.publishDate) }}
                            </td>
                            <td class="">
                                {{ dateformat(announcement.closeDate) }}
                            </td>
                            <td class="text-center">
                                {{ announcement.announcementDisplay }}
                            </td>
                            <td class="flex justify-center">
                                <router-link :to="{
                                    path: `/admin/announcement/${announcement.id}`
                                }">
                                    <button class="rounded-md bg-sky-600 px-3 py-1 text-base font-bold mr-3 text-white">view</button>
                                </router-link>
                                <router-link :to="{
                                    path: `/admin/announcement/${announcement.id}/delete`
                                }">
                                    <button class="rounded-md bg-red-600 px-3 py-1 text-base font-bold text-white">delete</button>
                                </router-link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-else>
                <h1 class="mt-2 mb-3 ml-6 text-custom-black">
                    <span class="font-bold ">Date/Time Show in Timezone :</span>
                    {{ timezoneName }}
                </h1>
                <h1 class="text-4xl flex w-full items-center justify-center font-noto">
                    No Announcements
                </h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
th {
    padding: 1.5rem;
}

td {
    padding: 1.5rem;
}
</style>