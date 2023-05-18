<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getuserAnnouncement, getCategory } from "../assets/data.js";
import { useMode } from "../stores/mode.js";
import router from "../router/index.js";
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";

const totalpage = ref(0);
const pageSize = ref(0);
const currentpage = ref(0);
const allAnnouncement = ref([]);
const allCategory = ref([]);
const category = ref(0);
const newdata = ref([]);
const myMode = useMode();
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const lastpage = ref(false);
const firstpage = ref(false);

const setOfPage = computed(() => {
    const totalPages = totalpage.value;
    const currentPage = currentpage.value;
    const range = 10

    if (totalPages <= range) {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    let start = Math.max(currentPage - Math.floor(range / 2), 1);
    let end = start + range - 1;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - range + 1, 1);
    }

    // Adjust start and end if currentPage is greater than range/2
    if (currentPage > Math.floor(range / 2)) {
        start = currentPage - Math.floor(range / 2);
        end = start + range - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - range + 1, 1);
        }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

const setOfpagex = computed(() => {
  let range = 10
  let page = currentpage.value + 1
  let pagelist = []
  if (totalpage.value > 10) {
    if (page < range) {
      for (let i = 1; i <= 10; i++) {
        pagelist.push(i)
      }
    } else if (page >= range) {
      for (let i = 1; i <= 10; i++) {
        pagelist.push(i + (page - range))
      }
    }
  } else {
    for (let i = 1; i <= totalpage.value; i++) {
      pagelist.push(i)
    }
  }
  return pagelist
})

const nextPage = async () => {
  if (currentpage.value < totalpage.value) {
    currentpage.value++;
    await fetchData();
  }
};

const previousPage = async () => {
  if (currentpage.value > 0) {
    currentpage.value--;
    await fetchData();
  }
};

const goToPage = async (page) => {
  currentpage.value = page;
  await fetchData();
};

const changeMode = async () => {
  currentpage.value = 0;
  myMode.changeMode();
  await fetchData();
};

const changeCategory = async () => {
  currentpage.value = 0;
  await fetchData();
};

const fetchData = async () => {
  newdata.value = [];
  const receivedData = await getuserAnnouncement(
    myMode.mode,
    currentpage.value,
    category.value
  );
  receivedData.content.forEach((x) => newdata.value.push(x));
  pageSize.value = receivedData.size;
  totalpage.value = receivedData.totalPages;
  lastpage.value = receivedData.last;
  firstpage.value = receivedData.first;
  allAnnouncement.value = newdata.value;
};

onBeforeMount(async () => {
  await fetchData();
  const receivedCategory = await getCategory();
  receivedCategory.forEach((category) => allCategory.value.push(category));
});
const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false
};
const dateformat = (date) => {
  console.log(date);
  if (date === null) {
    return "-";
  } else {
    let mydate = new Date(date);
    return mydate.toLocaleDateString("en-GB", options);
  }
};

</script>

<template>
  <div class="w-screen">
    <Navbar></Navbar>
    <div class="w-full flex justify-center">
      <div class="font-noto w-full p-8">
        <div class="w-full flex flex-col justify-between mt-2 mb-3">
          <div class="w-full flex flex-row">
            <div class="w-full flex flex-row items-center space-x-2">
              <p class="font-bold">Choose Category:</p>
              <select @change="changeCategory" v-model="category" name="category" id="category-select"
                class="border rounded-md bg-slate-100 text-lg ann-category-filter py-2 px-4">
                <option value="0" selected>ทั้งหมด</option>
                <option v-for="(item, index) in allCategory" :key="index" :value="item.categoryID">
                  {{ item.categoryName }}
                </option>
              </select>
            </div>
            <button
              class="w-auto rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white ann-button transition duration-75"
              @click="changeMode" :class="myMode.mode === 'close' ? 'bg-emerald-400' : 'bg-red-500'">
              {{
                myMode.mode === "close"
                ? "Active Announcement"
                : "Closed Announcement"
              }}
            </button>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <table class="w-full rounded-lg border-separate border-spacing-y-8" v-if="allAnnouncement.length != 0">
            <tr class="sticky top-0 bg-cyan-600 text-white">
              <th class="text-left w-6 rounded-l-full">No.</th>
              <th class="text-left pr-6">Title</th>
              <th class="text-left " :class="myMode.mode === 'close' ? '' : 'rounded-r-full'">Category</th>
              <th v-if="myMode.mode === 'close'" class="rounded-r-full">Closedate</th>
            </tr>
            <tr v-for="(announcement, index) in allAnnouncement" :key="index"
              class="bg-slate-50 rounded-full shadow-inner ann-item">
              <td class="rounded-l-full">
                {{ index + 1 + currentpage * pageSize }}
              </td>
              <td class="ann-title font-extrabold  ">
                <router-link :to="{ path: `/announcement/${announcement.id}` }" class="hover:text-sky-700">
                  {{ announcement.announcementTitle }}
                </router-link>
              </td>
              <td class="ann-category " :class="myMode.mode === 'close' ? '' : 'rounded-r-full'">
                {{ announcement.announcementCategory }}
              </td>
              <td class="rounded-r-full ann-close-date" v-if="myMode.mode === 'close'">
                {{ dateformat(announcement.closeDate) }}
              </td>
            </tr>
          </table>
          <div v-else class="flex w-full items-center justify-center bg-sky-600 text-white">
            <h1 class="text-4xl text-center font-noto">No Announcements</h1>
          </div>
          <div class="mt-5 flex" v-if="allAnnouncement.length != 0 && totalpage > 1">
            <button @click="previousPage" :disabled="firstpage"
              class="rounded-l-md bg-cyan-600 px-4 py-3 text-sm font-bold ann-button disabled:bg-gray-400 text-white mr-6 transition duration-200 active:scale-90 ann-page-prev">
              Prev
            </button>
            <div class="pagination">
              <button v-for="(value, index) in setOfPage" :key="index" @click="goToPage(value - 1)"
                :disabled="value - 1 === currentpage" :class="value - 1 === currentpage
                    ? `bg-sky-300 text-white ann-page-${index}`
                    : `text-custom-black hover:bg-slate-400 ann-page-${index}`
                  " class="px-4 py-3 text-sm font-bold ann-button rounded-full transition duration-200">
                {{ value }}
              </button>
            </div>
            <button @click="nextPage" :disabled="lastpage"
              class="rounded-r-md bg-cyan-600 px-4 py-3 text-sm font-bold text-white ann-button disabled:bg-gray-400 ml-6 active:scale-90 transition duration-200 ann-page-next">
              Next
            </button>
          </div>
          <!-- <div v-else>
                <h1 :class="allAnnouncement.length === 0 ? 'opacity-0' : 'opacity-100'"
                    class="mt-2 mb-3 ml-6 text-custom-black">
                    <span class="font-bold">Date/Time Show in Timezone :</span>
                    {{ timezoneName }}
                </h1>
                <h1 :class="allAnnouncement.length === 0 ? 'opacity-0' : 'opacity-100'"
                    class="text-4xl flex w-full items-center justify-center font-noto">
                    No Announcements
                </h1>
            </div> -->
        </div>
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