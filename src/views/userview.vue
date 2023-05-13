<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getuserAnnouncement, getCategory } from "../assets/data.js";
import { useMode } from "../stores/mode.js";
import router from '../router/index.js';
import { RouterLink } from "vue-router";

const totalpage = ref(0);
const pageSize = ref(0);
const currentpage = ref(0);
const allAnnouncement = ref([]);
const allCategory = ref([])
const category = ref(0)
const newdata=ref([])
const myMode = useMode();
const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const lastpage=ref(false)
const firstpage=ref(false)

const setOfPage = computed(() => {
    const totalPages = totalpage.value;
    const currentPage = currentpage.value;
    const range = 10;

    if (totalPages <= range) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(currentPage - Math.floor(range / 2), 1);
    let end = start + range - 1;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - range + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});


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
    currentpage.value = 0
    myMode.changeMode();
    await fetchData();
};

const changeCategory = async () => {
    currentpage.value = 0
    await fetchData()
}

const fetchData = async () => {
    newdata.value=[]
    const receivedData = await getuserAnnouncement(myMode.mode, currentpage.value, category.value);
    receivedData.content.forEach((x) => newdata.value.push(x));
    pageSize.value = receivedData.size;
    totalpage.value = receivedData.totalPages;
    lastpage.value=receivedData.last
    firstpage.value=receivedData.first
    allAnnouncement.value=newdata.value
    console.log(lastpage.value);
};

onBeforeMount(async () => {
    await fetchData();
    const receivedCategory = await getCategory()
    receivedCategory.forEach((category) => allCategory.value.push(category))
});

</script>

<template>
    <div class="w-screen">
        <div class="w-full flex justify-center">
            <div class="font-noto w-full p-8">
                <div class="w-full flex flex-col justify-between mt-2 mb-3">
                    <h1 class="text-custom-black">
                        <span class="font-bold">Date/Time Show in Timezone :</span>
                        {{ timezoneName }}
                    </h1>
                    <div class="w-full flex flex-row">
                        <div class="w-full flex flex-row items-center space-x-2">
                            <p class="font-bold">Choose Category:</p>
                            <select @change="changeCategory" v-model="category" name="category" id="category-select"
                                class="border rounded-md bg-slate-100 text-lg ann-category py-2 px-4">
                                <option value="0" selected>ทั้งหมด</option>
                                <option v-for="(item, index) in allCategory" :key="index" :value="item.categoryID">
                                    {{ item.categoryName }}
                                </option>
                            </select>
                        </div>            
                        <button
                            class="w-auto rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white  ann-button  transition duration-75 "
                            @click="changeMode" :class="myMode.mode === 'close'? 'bg-emerald-400':'bg-red-500'">{{ myMode.mode === 'close' ? 'Active Announcement' : 'Closed Announcement'}}</button>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <table class="w-full border" v-if="allAnnouncement.length != 0">
                        <tr class="sticky top-0 bg-cyan-600 border text-white">
                            <th class="text-left w-6">No.</th>
                            <th class="text-left pr-6">Title</th>
                            <th class="text-left">Category</th>
                        </tr>
                        <tr  v-for="(announcement, index) in allAnnouncement" :key="index"
                            class="overflow-auto ann-item " :class="index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'">
                            <td class="">
                                {{ (index + 1) + currentpage * pageSize}}
                            </td>
                            <td class="ann-title font-extrabold">
                                <router-link :to="{path: `/announcement/${announcement.id}`}">
                                    {{ announcement.announcementTitle }}
                                </router-link>
                            </td>
                            <td class="ann-category">
                                {{ announcement.announcementCategory }}
                            </td>
                        </tr>
                    </table>
                    <div v-else class="flex w-full items-center justify-center bg-sky-600 text-white">
                            <h1
                                class="text-4xl text-center font-noto">
                                No Announcements
                            </h1>
                        </div>
                    <div class="mt-5 flex" v-if="allAnnouncement.length != 0">
                        <button @click="previousPage" :disabled="firstpage"
                            class="rounded-l-md bg-cyan-600 px-4 py-3 text-sm font-bold ann-button disabled:bg-gray-400 text-white mr-6 transition duration-200 active:scale-90">Prev</button>
                        <div class="pagination">
                            <button v-for="value in setOfPage" @click="goToPage(value - 1)"
                                :disabled="value - 1 === currentpage"
                                :class="value - 1 === currentpage ? 'bg-sky-300 text-white' : ' text-custom-black hover:bg-slate-400 '"
                                class="px-4 py-3 text-sm font-bold ann-button rounded-full transition duration-200">
                                {{ value }}
                            </button>
                        </div>
                        <button @click="nextPage" :disabled="lastpage"
                            class="rounded-r-md bg-cyan-600 px-4 py-3 text-sm font-bold text-white ann-button disabled:bg-gray-400 ml-6 active:scale-90 transition duration-200" >Next</button>
                    </div>
                </div>
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
</template>

<style scoped>
th {
    padding: 1.5rem;
}

td {
    padding: 1.5rem;
}
</style>