<script setup>
import { getCategory, addAnnouncement } from '../assets/data.js'
import { onMounted, ref, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import router from '../router/index.js'
import AlertModal from '../components/AlertModal.vue';

const categoryAll = ref([])

onMounted(async () => {
    const receivedData = ref([])
    receivedData.value = await getCategory()
    receivedData.value.forEach((data) => categoryAll.value.push(data))
})

const publishDate = ref(null)
const publishTime = ref(null)
const closeDate = ref(null)
const closeTime = ref(null)
const display = ref('')
const fillcurdatepb = ref(false)
const fillcurdatecl = ref(false)

const convertDate = (date, time, deftime) => {

    if (date === null || date === "") {
        return null
    } else {
        try {
            return new Date(date + "T" + (time === null ? deftime : time)).toISOString().replace(".000Z", "Z")
        }
        catch (error) {
            console.error(error);
        }
    }
}

const newAnnouncement = ref({
    announcementTitle: '',
    categoryId: '',
    announcementDisplay: '',
    announcementDescription: '',
    publishDate: null,
    closeDate: null
})

function createdate(data) {
    let dateStr = data;
    let [day, month, year] = dateStr.split("/");
    let years = parseInt(year)
    year = years.toString()
    if (month.length === 1) {
        month = "0" + month
    }
    if (day.length === 1) {
        day = "0" + day
    }

    return year + "-" + day + "-" + month
}

let opt = { year: 'numeric', month: 'numeric', day: 'numeric' };

const startdate = computed(() => {
    const currentDate = new Date();
    let DATE = currentDate.toLocaleDateString("en-US", opt)
    return createdate(DATE)
})
const enddate = computed(() => {
    if (closeDate.value == "" || closeDate.value == null) {
        return ""
    }
    const currentDate = new Date(closeDate.value);
    let DATE = currentDate.toLocaleDateString("en-US", opt)
    return createdate(DATE)
})
const closestartdate = computed(() => {
    if (publishDate.value == "" || publishDate.value == null) {
        const currentDate = new Date();
        let opt = { year: 'numeric', month: 'numeric', day: 'numeric' };
        let DATE = currentDate.toLocaleDateString("en-US", opt)
        return createdate(DATE)
    } else {
        const currentDate = new Date(publishDate.value);
        let DATE = currentDate.toLocaleDateString("en-US", opt)
        return createdate(DATE)
    }
})

const isDisabled = computed(() => {
    const checkfill = () => {
        const emptyValue = []
        for (const [key, value] of Object.entries(newAnnouncement.value)) {
            if (!key.includes('Date') && !key.includes('Display') && value == '') {
                emptyValue.push(key)
            }
        }
        return emptyValue.length > 0 ? true : false
    }
    const lencheck = () => {
        if (newAnnouncement.value.announcementTitle.trim().length == 0) { return true }
        if (newAnnouncement.value.announcementDescription.trim().length == 0) { return true }
        if (newAnnouncement.value.announcementTitle.length > 200) {
            return true
        }
        if (newAnnouncement.value.announcementDescription.length > 10000) {
            return true
        }
        return false
    }
    const datecheckpb = () => {
        if (publishDate.value != "" && publishDate.value != null) {
            let currentdate = Date.now()
            let mydate = new Date(convertDate(publishDate.value, publishTime.value, "06:00")).getTime()
            if (currentdate > mydate) {
                fillcurdatepb.value = true
                return true
            } else {
                fillcurdatepb.value = false
            }
            return false
        }
    }
    const datecheckcl = () => {
        if (publishDate.value == "" || publishDate.value == null) {
            if (closeDate.value != "" && closeDate.value != null) {
                let currentdate = Date.now()
                let mydate = new Date(convertDate(closeDate.value, closeTime.value, "18:00")).getTime()
                if (currentdate > mydate) {
                    fillcurdatecl.value = true
                    return true
                } else {
                    fillcurdatecl.value = false
                    return false
                }
            }
        } else {
            if (closeDate.value != "" && closeDate.value != null) {
                let currentdate = Date.now()
                let mydate = new Date(convertDate(closeDate.value, closeTime.value, "18:00")).getTime()
                let publishdd = new Date(convertDate(publishDate.value, publishTime.value, "06:00")).getTime()
                if (currentdate > mydate || mydate < publishdd) {
                    fillcurdatecl.value = true
                    return true
                } else {
                    fillcurdatecl.value = false
                    return false
                }
            }
        }
        return false
    }
    if (publishDate.value != null && publishDate.value != "" && publishTime.value == null) {
        publishTime.value = "06:00"
    }
    if (closeDate.value != null && closeDate.value != "" && closeTime.value == null) {
        closeTime.value = "18:00"
    }
    return checkfill() || lencheck() || datecheckpb() || datecheckcl()
    // return checkfill()
})

const addnewdata = async () => {
    newAnnouncement.value.publishDate = convertDate(publishDate.value, publishTime.value)
    newAnnouncement.value.closeDate = convertDate(closeDate.value, closeTime.value)
    newAnnouncement.value.announcementDisplay = display.value == true ? 'Y' : 'N'
    status.value = await addAnnouncement(newAnnouncement.value)
    changeAlertToggle()
}
function clearcd() {
    closeDate.value = null
    fillcurdatecl.value = false
    if (closeTime != null || closeTime != "") {
        closeTime.value = null
    }
}

function clearpd() {
    publishDate.value = null
    fillcurdatepb.value = false
    if (publishTime != null || publishTime != "") {
        publishTime.value = null
    }
}

const isAlertToggle = ref(false)

const changeAlertToggle = () => {
    isAlertToggle.value = !isAlertToggle.value
}

const status = ref(true)
</script>

<template>
    <div class="w-screen h-screen">
        <div class="w-full h-full items-center flex flex-col font-noto">
            <div class="w-3/4 h-auto flex flex-col border rounded-md mt-5 bg-white shadow-xl">
                <div class="flex px-4 pt-4">
                    <h2 class="font-bold text-2xl">Create Announcement </h2>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label for="title" class="text-base font-bold">Title</label>
                    <input v-model="newAnnouncement.announcementTitle" type="text" id="title" maxlength="200"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-title"
                        placeholder="Learning Exchanging">
                    <p class="flex justify-end">{{ newAnnouncement.announcementTitle.trim().length }}/200</p>
                </div>
                <div class="flex flex-col w-2/5 px-4 py-2 space-y-1">
                    <label for="category-select" class="text-base font-bold">Category</label>
                    <select v-model="newAnnouncement.categoryId" name="category" id="category-select"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-category">
                        <option value="" disabled>Select a category</option>
                        <option v-for="(item, index) in categoryAll" :key="index" :value="item.categoryID">
                            {{ item.categoryName }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label for="description" class="text-base font-bold">Description</label>
                    <!-- <textarea v-model="newAnnouncement.announcementDescription" maxlength="10000" rows="6" id="description"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-description"
                        placeholder="Imagination is more important than knowledge...">
                    </textarea> -->
                    <QuillEditor v-model:content="newAnnouncement.announcementDescription" theme="snow" toolbar="full" contentType="html"></QuillEditor>
                    <p class="flex justify-end">{{ newAnnouncement.announcementDescription.trim().length }}/10000</p>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Publish Date</label>
                    <div class="w-1/3 flex flex-row space-x-4">
                        <input v-model="publishDate" type="date" placeholder="01/05/2023" :min="startdate" :max="enddate"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-publish-date" id="publishDate">
                        <input :disabled="!publishDate" v-model="publishTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-publish-time" id="publishDate">
                        <button :disabled="!publishDate"
                            class="px-4 py-2 rounded-md bg-orange-400 text-white text-base font-bold disabled:hidden"
                            @click="clearpd()">clear</button>
                    </div>
                    <div class="text-red-500 ml-3" v-show="fillcurdatepb">publishdate must be a future</div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Close Date</label>
                    <div class="w-1/3 flex flex-row space-x-4">
                        <input v-model="closeDate" type="date" placeholder="01/05/2023" :min="closestartdate"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-date " id="closeDate">
                        <input :disabled="!closeDate" v-model="closeTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-time" id="closeDate">
                        <button :disabled="!closeDate"
                            class="px-4 py-2 rounded-md bg-orange-400 text-white text-base font-bold disabled:hidden"
                            @click="clearcd()">clear</button>

                    </div>
                    <div class="text-red-500 ml-3" v-show="fillcurdatecl"><span>must be later than publish date</span></div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <div class="space-x-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" v-model="display">
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Display
                                Announcement</span>
                        </label>
                    </div>
                </div>
                <p class=" ml-5 flex text-red-600" v-show="newAnnouncement.announcementTitle.trim().length == 0">PLEASE FILL
                    THE TITLE</p>
                <p class=" ml-5 flex text-red-600" v-show="newAnnouncement.categoryId == ''">PLEASE Select CATEGORY</p>
                <p class=" ml-5 flex text-red-600" v-show="newAnnouncement.announcementDescription.trim().length == 0">PLEASE
                    FILL THE DESCRIPTION</p>
                <div class="w-full flex justify-start p-4 space-x-2">
                    <button :disabled="isDisabled"
                        class="px-4 py-2 rounded-md bg-green-500 text-white text-base font-bold disabled:bg-zinc-500 ann-button"
                        @click="addnewdata()">submit</button>
                    <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="router.push('/admin/announcement')">Cancel</button>
                </div>
            </div>
            <AlertModal v-if="isAlertToggle" :action="'add'" :status="status" @changeToggle="changeAlertToggle"></AlertModal>
        </div>
    </div>
</template>

<style scoped></style>