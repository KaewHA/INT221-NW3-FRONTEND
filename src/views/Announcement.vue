<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import router from "../router/index.js";
import { getAnnouncement } from "../assets/data.js";
import Navbar from "../components/Navbar.vue";

onBeforeMount(async () => {
  allAnnouncement.value = await getAnnouncement();
  allAnnouncement.value.forEach((x) => testdata.value.push(x));
});
const testdata = ref([]);
const allAnnouncement = ref([]);
console.log(testdata.value);
const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const dateformat = (date) => {
  if (date === null) {
    return "-";
  } else {
    let mydate = new Date(date);
    // let mydateutc = mydate.toISOString()
    //console.log(mydateutc);
    let timezone = mydate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(mydate.getTime() - timezone);
    return localDate.toLocaleDateString("en-US", options);
  }
};
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<template>
  <div class="w-screen h-screen">
    <Navbar></Navbar>
    <!-- <div class="flex justify-center items-center mt-3 mb-5 font-noto">
      <h1 class="text-4xl text-emerald-500">SIT Announcement System (SAS)</h1>
    </div> -->
    <div v-if="testdata.length != 0" class="font-noto">
      <h1 class="mt-2 mb-3 ml-6">
        <span class="font-bold">Date/Time Showintimezone :</span>
        {{ timezoneName }}
      </h1>
      <div class="flex justify-center items-center mt-10 mb-10">
        <h1 class="text-center text-5xl font-semibold">ประกาศล่าสุด</h1>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div v-for="(announcement, index) in allAnnouncement" :key="index" class="w-1/2 pt-5 flex flex-row border-b">
          <div class="w-full">
            <p class="font-semibold text-xl">{{ announcement.announcementName }}</p>
            <div class="flex space-x-16 my-5">
              <p class="opacity-50 font-bold w-1/6">{{ announcement.categoryName }}</p>
              <p class="opacity-50 w-1/4 text-center">{{ dateformat(announcement.publishDate) }}</p>
              <p class="text-center w-1/6">Display : 
                <span class="font-bold" :class="announcement.annonuncementDisplay==='Y'?'text-green-600':'text-red-600'">{{ announcement.annonuncementDisplay }}</span>
              </p>
            </div>
          </div>
          <div class="w-1/6 flex justify-center items-center">
            <router-link :to="{
              name: 'AnnouncementDetail',
              params: { id: announcement.announcementID },
            }">
              <p class="text-custom-blue font-bold">view >></p>
            </router-link>
          </div>
        </div>
      </div>












      <!-- <table class="center w-full">
        <tr class="sticky top-0 border-2 bg-slate-100">
          <th class="">No.</th>
          <th class="text-left pr-6">Title</th>
          <th>Category</th>
          <th>Publish Date</th>
          <th>Close Date</th>
          <th>Display</th>
          <th>Action</th>
        </tr>
        <tr
          v-for="(announcement, index) in allAnnouncement"
          :key="index"
          class="overflow-auto border-b-2"
        >
          <td class="text-center">
            {{ index + 1 }}
          </td>
          <td class="text-left flex">
            {{ announcement.announcementName }}
          </td>
          <td class="text-center">
            {{ announcement.categoryName }}
          </td>
          <td class="text-center">
            {{ dateformat(announcement.publishDate) }}
          </td>
          <td class="text-center">
            {{ dateformat(announcement.closeDate) }}
          </td>
          <td class="text-center">
            {{ announcement.annonuncementDisplay }}
          </td>
          <td class="text-center">
            <router-link
              :to="{
                name: 'AnnouncementDetail',
                params: { id: announcement.announcementID },
              }"
            >
              <button class="rounded-md bg-gray-200 px-3 py-1 text-xl">view</button>
            </router-link>
          </td>
        </tr>
      </table> -->
    </div>
    <div v-else>
      <h1 class="text-4xl flex w-full items-center justify-center font-noto">
        No Announcement
      </h1>
    </div>
  </div>
</template>

<style scoped>
th {
  padding: 2rem;
}

td {
  padding: 3rem;
}
</style>
