<script setup>
import { ref, onBeforeMount } from "vue";
import { getAnnouncement, deleteannocement } from "../assets/data.js";
import router from '../router/index.js'
import Navbar from "../components/Navbar.vue";
import AkarIconsEye from '../components/icon/AkarIconsEye.vue'
import Trash from '../components/icon/Trash.vue'
import pluss from '../components/icon/IcRoundAddCircle.vue'
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

const deleteanno = async (id) => {
    await deleteannocement(id)
}
const cf = (id) => {
    if (confirm(`Do you want to delete announcemmnet ID:${id}`) == true) {
        deleteanno(id)
        location.reload();
    }
}


</script>

<template>
    <div class="w-screen font-noto">
        <Navbar></Navbar>
        <div class="w-full flex justify-center">
            <div v-if="allAnnouncement.length != 0" class="font-noto w-full p-8">
                <div class="w-full flex flex-row justify-between mt-2 mb-3">
                    <div class=" w-full flex justify-end ">
                    <button
                        class=" w-32 h-14 mr-10 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button border-2 flex justify-center items-center add"
                        @click="router.push('/admin/announcement/add')"><span class="f">Add Announcement</span><pluss class="e "></pluss></button></div>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <table class="w-full rounded-lg border-separate border-spacing-y-8">
                        <thead>
                            <tr class="sticky top-0 bg-cyan-600 text-white">
                                <th class="text-left rounded-l-full">No.</th>
                                <th class="text-left pr-6">Title</th>
                                <th class="text-left">Category</th>
                                <th class="text-left">Publish Date</th>
                                <th class="text-left">Close Date</th>
                                <th class="">Display</th>
                                <th class="py-1 rounded-r-full">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(announcement, index) in allAnnouncement" :key="index"
                                class="bg-slate-50 rounded-full shadow-inner ann-item">
                                <td class="rounded-l-full">
                                    {{ index + 1 }}
                                </td>
                                <td class="ann-title">
                                    {{ announcement.announcementTitle }}
                                </td>
                                <td class="ann-category">
                                    <span class="bg-sky-200 rounded-xl p-2">{{ announcement.announcementCategory }}</span>
                                </td>
                                <td class="ann-publish-date">
                                    {{ dateformat(announcement.publishDate) }}
                                </td>
                                <td class="ann-close-date">
                                    {{ dateformat(announcement.closeDate) }}
                                </td>
                                <td class="text-center ann-display">
                                    <span
                                        :class="announcement.announcementDisplay == 'Y' ? 'bg-emerald-500 rounded-full' : 'bg-red-500 rounded-full'"
                                        class="p-2 text-white"> {{ announcement.announcementDisplay }}</span>
                                </td>
                                <td class="rounded-r-full">
                                    <div class="flex justify-center">
                                        <button @click="router.push(`/admin/announcement/${announcement.id}`)" 
                                            class="flex justify-center items-center rounded-md bg-sky-600 px-3 py-1 text-base font-bold mr-3 w-20 h-10 text-white hover:bg-sky-700 ann-button view">
                                            <span class="a">view</span>
                                            <AkarIconsEye class="b">
                                            </AkarIconsEye>
                                        </button>
                                        <button
                                            class="flex justify-center items-center rounded-md bg-red-600 px-3 py-1 text-base font-bold w-20 h-10 text-white hover:bg-red-700 ann-button delete"
                                            @click="cf(announcement.id)">
                                            <span class="c">delete</span>
                                            <Trash class="d"></Trash>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div v-else class="w-full h-full">
                <h1 class="text-4xl flex w-full items-center justify-center font-noto mt-9">
                    No Announcements 
                </h1>
                <div class= "w-full   flex justify-center mt-6">
                <button  @click="router.push('/admin/announcement/add')" class=" w-3/4 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 flex justify-center noad"><pluss class="e"></pluss> <span class="f">ADD THE FIRST ANNOUNCEMENT</span></button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.view .b {
    display: none;
}

.view:hover .b {
    display: inline;
}

.view:hover .a {
    display: none;
}

.delete .d{
    display: none;
}

.delete:hover .d {
    display: inline;
}

.delete:hover .c {
    display: none;
}

th {
    padding: 1rem;
}

td {
    padding: 1.25rem;
}

.add:hover  .e{
    display: inline;
}

.add:hover  .f{
    display: none;
}

.add .e{
    display: none;
}
.add .f{
    display: inline;
}

.noad:hover  .e{
    display: inline;
}

.noad:hover  .f{
    display: none;
}

.noad .e{
    display: none;
}
.noad .f{
    display: inline;
}
</style>