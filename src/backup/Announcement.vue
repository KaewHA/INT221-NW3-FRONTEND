<script setup>
import { ref, onBeforeMount } from "vue";
import { getAnnouncement } from "../assets/data.js";

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
    // let timezone = mydate.getTimezoneOffset() * 60 * 1000;
    // const localDate = new Date(mydate.getTime() - timezone);
    return mydate.toLocaleDateString("en-GB", options);
  }
};
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

console.log(allAnnouncement.value);
</script>

<template>
  <div class="w-screen h-screen">
    <div v-if="allAnnouncement.length != 0" class="font-noto">
      <h1 class="mt-2 mb-3 ml-6 text-custom-black">
        <span class="font-bold ">Date/Time Show in Timezone :</span>
        {{ timezoneName }}
      </h1>
      <div class="flex justify-center items-center mt-10 mb-10 max-md:mt-8 max-md:mb-4">
        <h1 class="text-center text-5xl font-semibold max-md:text-3xl text-custom-black">ประกาศล่าสุด</h1>
      </div>
      <div class="flex flex-col justify-center items-center ">
        <div v-for="(announcement, index) in allAnnouncement" :key="index"
          class="w-1/2 pt-5 flex flex-row border-b max-md:w-full max-md:px-10 ann-item">
          <div class="w-full max-md:hidden flex flex-col">
            <p class="font-semibold text-xl max-md:text-base text-custom-black ann-title"><span>#{{ index + 1 }}</span> {{
              announcement.announcementTitle }}</p>
            <div class="flex space-x-5 my-5">
              <p class="opacity-50 w-1/2 text-custom-black ann-category"><span class="font-bold">Category : </span>{{
                announcement.announcementCategory }}</p>
              <p class="w-1/2 text-custom-black ann-display"><span class="font-bold opacity-50">Display : </span>
                <span class="font-bold"
                  :class="announcement.announcementDisplay === 'Y' ? 'text-green-600' : 'text-red-600'">{{
                    announcement.announcementDisplay }}</span>
              </p>
            </div>
            <div class="flex mb-5 space-x-5">
              <p class="opacity-50 text-custom-black w-full ann-publish-date"><span class="font-bold">Publish Date :
                </span><span class="text-center">{{ dateformat(announcement.publishDate) }}</span></p>
              <p class="opacity-50 text-custom-black w-full ann-close-date"><span class="font-bold">Close Date :
                </span><span class="text-center">{{ dateformat(announcement.closeDate) }}</span></p>
            </div>
          </div>
          <!-- responsive -->
          <div class="w-full md:hidden">
            <p class="font-semibold text-xl max-md:text-base">{{ announcement.announcementTitle }}</p>
            <div class="flex flex-col my-2">
              <div class="flex flex-row">
                <p class="opacity-50 w-full font-bold text-sm mb-2">Category : {{ announcement.announcementCategory }}</p>
                <p class="text-center w-full opacity-80 text-sm"><span class="font-bold opacity-50">Display : </span>
                  <span class="font-bold"
                    :class="announcement.announcementDisplay === 'Y' ? 'text-green-600' : 'text-red-600'">{{
                      announcement.announcementDisplay }}</span>
                </p>
              </div>
              <p class="opacity-50 w-full text-sm mb-2"><span class="font-bold">Publish Date : </span><span class="">{{
                dateformat(announcement.publishDate) }}</span>
              </p>
              <p class="opacity-50 w-full text-sm mb-2"><span class="font-bold">Close Date : </span><span class="">{{
                dateformat(announcement.closeDate) }}</span>
              </p>
            </div>
          </div>
          <div class="w-1/12 flex justify-center items-center">
            <router-link :to="{
              path: `/admin/announcement/${announcement.id}`
            }">
              <p class="text-custom-blue font-bold ann-button">view >></p>
            </router-link>
          </div>
          <!--  -->
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="w-full flex mt-2 mb-3 ml-6 text-custom-black font-noto">
        <span class="font-bold ">Date/Time Show in Timezone :</span>
        {{ timezoneName }}
      </h1>
      <h1 class="text-4xl flex w-full items-center justify-center font-noto">
        No Announcements
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
