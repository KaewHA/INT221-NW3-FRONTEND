<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getAnnouncement, deleteannocement, getCategory } from "../assets/data.js";
import router from '../router/index.js'
import Navbar from "../components/Navbar.vue";
import AkarIconsEye from '../components/icon/AkarIconsEye.vue'
import Trash from '../components/icon/Trash.vue'
import pluss from '../components/icon/IcRoundAddCircle.vue'
import search from '../components/icon/search.vue'

onBeforeMount(async () => {
    const receivedData = ref([]);
    receivedData.value = await getAnnouncement();
    receivedData.value.forEach((x) => allAnnouncement.value.push(x));
    const receivedCategory = await getCategory();
    receivedCategory.forEach((category) => allCategory.value.push(category));
});
const category = ref(0);
const newdata = ref([]);
const allCategory = ref([]);
const allAnnouncement = ref([]);
const searchkeyword = ref('')
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
    isDeleteSuccess.value = await deleteannocement(id)
    // changeAlertToggle()
}
// const cf = (id) => {
//     if (confirm(`Do you want to delete announcemmnet ID:${id}`) == true) {
//         deleteanno(id)
//         location.reload();
//     }
// }

const changeCategory = async () => {
    await fetchData();
};

const fetchData = async () => {
    newdata.value = [];
    const receivedData = await getAnnouncement(
        "admin",
        category.value
    );
    receivedData.forEach((x) => newdata.value.push(x));
    if (newdata.value == 0) {
        alert("ไม่พบข้อมูล")
        let data = await getAnnouncement("admin", 0)
        category.value = 0
        allAnnouncement.value = data
    } else {
        allAnnouncement.value = newdata.value;
    }
};

const searchtitle = computed(() => {
    if (searchkeyword.value == "") {
        return 'Search...'
    } else {
        return ''
    }
})

const searchvalue = computed(() => {
    return allAnnouncement.value.filter((x) => x.announcementTitle.toLowerCase().includes(searchkeyword.value.toLowerCase()))
})

const isAlertToggle = ref(false)
const isDeleteSuccess = ref(null)

const changeAlertToggle = (id) => {
    id !== null ? deleteId.value = id : deleteId.value = 0
    isAlertToggle.value = !isAlertToggle.value
    if (isDeleteSuccess.value !== null) {
        location.reload()
    }
    isDeleteSuccess.value = null
}

const deleteId = ref(0)
</script>

<template>
    <div class="w-screen font-noto">
        <Navbar></Navbar>
        <div class="w-full flex justify-center">
            <div v-if="allAnnouncement.length != 0" class="font-noto w-full p-8">
                <div class="w-full flex flex-row justify-between mt-2 mb-3">
                    <div class="w-full flex justify-end">
                        <search class="mr-4 w-7 h-auto"></search>
                        <div class="relative mb-3 mt-2 mr-6" data-te-input-wrapper-init>
                            <input type="search" v-model="searchkeyword"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleSearch2" placeholder="Type query" />
                            <label for="exampleSearch2"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ">
                                <div class="flex" v-html="searchtitle"></div>
                            </label>
                        </div>
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
                            class=" w-32 h-14 mr-10 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button border-2 flex justify-center items-center add"
                            @click="router.push('/admin/announcement/add')"><span class="f">Add Announcement</span>
                            <pluss class="e"></pluss>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center w-full">
                    <table class="w-full rounded-lg border-separate border-spacing-y-8">
                        <thead>
                            <tr class="sticky top-0 bg-cyan-600 text-white">
                                <th class="text-left rounded-l-full">No.</th>
                                <th class="text-left pr-6">Title</th>
                                <th class="text-left">Category</th>
                                <th class="text-left">Publish Date</th>
                                <th class="text-left">Close Date</th>
                                <th class="text-center">Display</th>
                                <th class="">View</th>
                                <th class="py-1 rounded-r-full">Action</th>
                            </tr>
                        </thead>
                        <tbody class="w-full">
                            <tr v-for="(announcement, index) in searchvalue" :key="index"
                                class="bg-slate-50 w-full rounded-full shadow-inner overflow-hidden ann-item">
                                <td class="rounded-l-full w-1/12">
                                    {{ index + 1 }}
                                </td>
                                <td class="ann-title overflow-hidden w-3/12">
                                    <p class="overflow-hidden w-96">{{ announcement.announcementTitle }}</p>
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
                                <td class="ann-counter text-center">
                                    {{ announcement.viewCount }}
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
                                            @click="changeAlertToggle(announcement.id)">
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
                <div class="w-full   flex justify-center mt-6">
                    <button @click="router.push('/admin/announcement/add')"
                        class=" w-3/4 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 flex justify-center noad">
                        <pluss class="e"></pluss> <span class="f">ADD THE FIRST ANNOUNCEMENT</span>
                    </button>
                </div>
            </div>
            <div v-if="isAlertToggle" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                <div class="max-w-2xl p-6 w-96 bg-white shadow-xl overflow-y-auto flex flex-col items-center rounded-lg">
                    <div class="flex items-center">
                        <img v-if="isDeleteSuccess === null" src="/icons/warning.svg" alt="">
                        <img v-else-if="isDeleteSuccess === true" src="/icons/success.svg" alt="">
                        <img v-else src="/icons/error.svg" alt="">
                    </div>
                    <div class="flex items-center justify-between my-2">
                        <h3 v-if="isDeleteSuccess === null" class="text-xl">Want to delete announcement?</h3>
                        <h3 v-else-if="isDeleteSuccess === true" class="text-xl">Delete announcement success!</h3>
                        <h3 v-else class="text-xl">Error, cannot delete announcement!</h3>
                    </div>
                    <div v-if="isDeleteSuccess === null" class="mt-4 space-x-4">
                        <button
                            class="px-4 py-2 border border-red-600 bg-white text-red-600 rounded hover:bg-red-600 hover:text-white duration-100 font-bold"
                            @click="deleteanno(deleteId)">
                            Yes, delete it!
                        </button>
                        <button
                            class="px-4 py-2 border border-emerald-500 bg-white text-emerald-500 rounded hover:bg-emerald-500 hover:text-white duration-100 font-bold"
                            @click="changeAlertToggle">
                            No, keep it!
                        </button>
                    </div>
                    <div class="mt-4 space-x-4" v-else>
                        <button
                            class="px-4 py-2 border border-emerald-500 bg-white text-emerald-500 rounded hover:bg-emerald-500 hover:text-white duration-100 font-bold"
                            @click="changeAlertToggle">
                            Okay!
                        </button>
                    </div>
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

.delete .d {
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

.add:hover .e {
    display: inline;
}

.add:hover .f {
    display: none;
}

.add .e {
    display: none;
}

.add .f {
    display: inline;
}

.noad:hover .e {
    display: inline;
}

.noad:hover .f {
    display: none;
}

.noad .e {
    display: none;
}

.noad .f {
    display: inline;
}
</style>