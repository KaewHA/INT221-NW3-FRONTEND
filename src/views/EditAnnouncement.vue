<script setup>
import { getCategory, updateAnnouncement, getAnnouncementByIddata } from '../assets/data.js'
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRoute } from 'vue-router';
import router from '../router';
import AlertModal from '../components/AlertModal.vue';
const { params } = useRoute()
const olddata = ref({})
const publishDate = ref(null)
const publishTime = ref(null)
const categoryAll = ref([])
const closeDate = ref(null)
const closeTime = ref(null)
const display = ref('')
const choosecategory = ref('')
const fillcurdatepb = ref(false)
const fillcurdatecl = ref(false)
const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
};
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
function createtime(H, M) {
    let hour = H.toString()
    let min = M.toString()
    if (hour.length === 1) {
        hour = "0" + hour
    }
    if (min.length === 1) {
        min = "0" + min
    }

    return hour + ":" + min
}
onBeforeMount(async () => {
    //get new announcement
    const receivedAnnouncement = ref()
    receivedAnnouncement.value = await getAnnouncementByIddata(params.id)
    for (const [key, value] of Object.entries(receivedAnnouncement.value)) {
        if (key.includes("publish") && value != null) {
            let date = new Date(value)
            let opt = { year: 'numeric', month: 'numeric', day: 'numeric' };
            let DATE = date.toLocaleDateString("en-US", opt)
            let timeH = date.getHours()
            let timeM = date.getMinutes()
            publishDate.value = createdate(DATE)
            publishTime.value = createtime(timeH, timeM)
            // newAnnouncement.value[key] = createdate(date)
        } else if (key.includes("close") && value != null) {
            // let date = new Date(value).toLocaleString()
            // newAnnouncement.value[key] = createdate(date)
            let date = new Date(value)
            let opt = { year: 'numeric', month: 'numeric', day: 'numeric' };
            let DATE = date.toLocaleDateString("en-US", opt)
            let timeH = date.getHours()
            let timeM = date.getMinutes()
            closeDate.value = createdate(DATE)
            closeTime.value = createtime(timeH, timeM)
        }
        else if (key != "announcementID") {
            if (key.includes("category")) {
                choosecategory.value = value.categoryName
            }
            if (key.includes("Display")) {
                if (receivedAnnouncement.value.announcementDisplay == "Y") {
                    display.value = true
                } else {
                    display.value = false
                }
            }
            if (key != "category") {
                newAnnouncement.value[key] = value
            }

        }
    }
    //get category announcement
    const receivedCategory = ref([])
    receivedCategory.value = await getCategory()
    categoryAll.value = []
    receivedCategory.value.forEach((data) => categoryAll.value.push(data))
    for (const [key, value] of Object.entries(receivedAnnouncement.value)) {
        olddata.value[key] = value
    }
})
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
    const checknewdata = () => {
        let x = categoryAll.value.find((x) => x.categoryName === choosecategory.value)
        newAnnouncement.value.categoryId = x
        if ((publishDate.value != "" && publishDate.value != null) && (publishTime.value == null || publishTime.value == "")) {
            publishTime.value = "06:00"
        }
        if ((closeDate.value != "" && closeDate.value != null) && (closeTime.value == null || closeTime.value == "")) {
            closeTime.value = "18:00"
        }
        newAnnouncement.value.publishDate = convertDate(publishDate.value, publishTime.value, "06:00")
        newAnnouncement.value.closeDate = convertDate(closeDate.value, closeTime.value, "18:00")
        newAnnouncement.value.announcementDisplay = display.value == true ? 'Y' : 'N'
        const check = () => {
            for (const [key, value] of Object.entries(olddata.value)) {
                if (key != "announcementID") {
                    if (!key.includes('category')) {
                        if (value != newAnnouncement.value[key]) {
                            return true
                        }
                    }

                }
            }
            return false
        }
        const checkcate = () => {
            if (choosecategory.value != 0) {
                if (olddata.value['category'] != undefined) {
                    let oldcate = olddata.value['category'].categoryName
                    let newcate = newAnnouncement.value.categoryId.categoryName
                    if (oldcate === newcate) {
                        return false
                    } else {

                        return true
                    }
                }
            }
            return false
        }
        let datacheck = check()
        let catecheck = checkcate()
        if (newAnnouncement.value.categoryId != undefined) {
            let id = newAnnouncement.value.categoryId.categoryID
            newAnnouncement.value.categoryId = id
        }
        return !(datacheck || catecheck)
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
    let titlenull = false
    let desnull = false
    if (newAnnouncement.value.announcementTitle.trim().length == 0) {
        titlenull = true
    }
    if (newAnnouncement.value.announcementDescription.trim().length == 0) {
        desnull = true
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
    return checknewdata() || titlenull || desnull || lencheck() || datecheckpb() || datecheckcl()
})
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
    publishDate: '',
    closeDate: ''
})

const createanno = async () => {
    await updateAnnouncement(newAnnouncement.value, params.id)
    status.value = await updateAnnouncement(newAnnouncement.value, params.id)
    changeAlertToggle()
}
function showdata() {
    ///show something
    console.log(olddata.value);
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
    <div class="w-full h-full">
        <div class="w-full h-full items-center flex flex-col font-noto">
            <!-- <h1 class="font-extrabold text-3xl self-center my-4 ">Create Announcement</h1> -->
            <div class="w-3/4 h-auto flex flex-col border rounded-md mt-5 bg-white shadow-xl">
                <div class="flex px-4 pt-4">
                    <h2 class="font-bold text-2xl">Update Announcement </h2>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label for="title" class="text-base font-bold">Title</label>
                    <input v-model="newAnnouncement.announcementTitle" type="text" id="title" axlength="200"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-title"
                        placeholder="Learning Exchanging">
                    <p class="flex justify-end">{{ newAnnouncement.announcementTitle.trim().length }}/200</p>
                </div>
                <div class="flex flex-col w-2/5 px-4 py-2 space-y-1">
                    <label for="category-select" class="text-base font-bold">Category</label>
                    <select v-model="choosecategory" name="category" id="category-select"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-category">
                        <option value="0" disabled>Select a category</option>
                        <option v-for="item  in categoryAll">
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
                    <QuillEditor v-model:content="newAnnouncement.announcementDescription" theme="snow" toolbar="full"
                        contentType="html"></QuillEditor>
                    <p class="flex justify-end">{{ newAnnouncement.announcementDescription.trim().length }}/10000</p>
                </div>
                <div class="">
                    <div class="flex flex-col w-full px-4 py-2 space-y-1">
                        <label class="text-base font-bold">Publish Date</label>
                        <div class="w-1/3 flex flex-row space-x-4">
                            <input v-model="publishDate" type="date" placeholder="01/05/2023" :min="startdate"
                                :max="enddate" class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-publish-date"
                                id="publishDate">
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
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-date" id="closeDate">
                            <input :disabled="!closeDate" v-model="closeTime" type="time" placeholder="12:30"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-time" id="closeDate">
                            <button :disabled="!closeDate"
                                class="px-4 py-2 rounded-md bg-orange-400 text-white text-base font-bold disabled:hidden"
                                @click="clearcd()">clear</button>
                        </div>
                        <div class="text-red-500 ml-3" v-show="fillcurdatecl">must be later than publish date</div>
                    </div>

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
                <p class=" ml-5 flex text-red-600" v-show="newAnnouncement.announcementTitle.trim().length == 0">PLESE FILL
                    THE TITLE</p>
                <p class=" ml-5 flex text-red-600" v-show="choosecategory == '0'">PLEASE Select CATEGORY</p>
                <p class=" ml-5 flex text-red-600" v-show="newAnnouncement.announcementDescription.trim().length == 0">PLESE
                    FILL THE DESCRIPTION</p>
                <div class="w-full flex justify-start p-4 space-x-2">
                    <button :disabled="isDisabled"
                        class="px-4 py-2 rounded-md bg-green-500 text-white text-base font-bold disabled:bg-zinc-500 ann-button"
                        @click="createanno()">Update</button>
                    <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="router.push('/admin/announcement')">Cancel</button>
                </div>
            </div>
            <AlertModal v-if="isAlertToggle" :action="'edit'" @changeToggle="changeAlertToggle" :status="status"></AlertModal>
        </div>
    </div>
</template>

<style scoped></style>