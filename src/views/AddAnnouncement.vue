<script setup>
import { getCategory, addAnnouncement } from '../assets/data.js'
import { onMounted, ref, computed } from 'vue';

const categoryAll = ref([])
onMounted(async () => {
    const receivedData = ref([])
    receivedData.value = await getCategory()
    receivedData.value.forEach((data) => categoryAll.value.push(data))
})

const publishDate = ref('')
const closeDate = ref('')
const isoPublishDate = computed(() => publishDate.value.replace(/\//g, '-') + 'T' + publishTime.value + ':00Z')

const publishTime = ref('')

const closeTime = ref('')

const display = ref('')
const displayConvert = computed(() => {
    return display.value == true?'Y':'N'
})

const newAnnouncement = ref({
    announcementTitle: '',
    category: '',
    announcementDisplay: displayConvert,
    announcementDescription: '',
    publishDate: '',
    closeDate: ''
})

const isDisabled = computed(() => {
    const checkValid = []
    for (const [key, value] of Object.entries(newAnnouncement.value)) {
        if(!key.includes('Date') && !key.includes('Display') && value == '') {
            checkValid.push(key)
        }
    }
    return checkValid.length > 0?true:false
})

const validateData = () => {
    // console.log(newAnnouncement.value);
    console.log(isoPublishDate.value);
}

</script>

<template>
    <h1 class="hidden">{{ validateData() }}</h1>
    <div class="w-screen h-screen items-center flex flex-col font-noto">
        <h1 class="font-extrabold text-3xl self-center my-4">Add Announcement</h1>
        <div class="w-3/4 h-auto flex flex-col border rounded-md">
            <div class="flex px-4 pt-4">
                <h2 class="font-bold text-2xl">Announcement Detail:</h2>
            </div>
            <div class="flex flex-col w-full px-4 py-2 space-y-1">
                <label for="title" class="text-base font-bold">Title</label>
                <input v-model="newAnnouncement.announcementTitle" type="text" id="title"
                    class="border rounded-md bg-slate-100 text-lg py-2 px-4" placeholder="Learning Exchanging">
            </div>
            <div class="flex flex-col w-2/5 px-4 py-2 space-y-1">
                <label for="category-select" class="text-base font-bold">Category</label>
                <select v-model="newAnnouncement.category" name="category" id="category-select"
                    class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                    <option value="" disabled>Select a category</option>
                    <option v-for="(item, index) in categoryAll" :key="index" :value="item">
                        {{ item.categoryName }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col w-full px-4 py-2 space-y-1">
                <label for="description" class="text-base font-bold">Description</label>
                <textarea v-model="newAnnouncement.announcementDescription" maxlength="10000" rows="10" id="description"
                    class="border rounded-md bg-slate-100 text-lg py-2 px-4"
                    placeholder="Imagination is more important than knowledge...">
                </textarea>
            </div>
            <div class="flex flex-col w-full px-4 py-2 space-y-1">
                <label class="text-base font-bold">Publish Date</label>
                <div class="w-1/3 flex flex-row space-x-4">
                    <input v-model="publishDate" type="text" placeholder="01/05/2023"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate">
                    <input v-model="publishTime" type="text" placeholder="12:30"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate">
                </div>
            </div>
            <div class="flex flex-col w-full px-4 py-2 space-y-1">
                <label class="text-base font-bold">Close Date</label>
                <div class="w-1/3 flex flex-row space-x-4">
                    <input v-model="closeDate" type="text" placeholder="01/05/2023"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate">
                    <input v-model="closeTime" type="text" placeholder="12:30"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate">
                </div>
            </div>
            <div class="flex flex-col w-full px-4 py-2 space-y-1">
                <label class="text-base font-bold">Display</label>
                <div class="space-x-2">
                    <input v-model="display" 
                    type="checkbox" id="display"
                    class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                    <label for="display" class="font-bold text-sm">Check to show this announcement</label>
                </div>
            </div>
            <div class="w-full flex justify-start p-4 space-x-2">
                <button :disabled="isDisabled"
                    class="px-4 py-2 rounded-md bg-green-500 text-white text-base font-bold disabled:bg-zinc-500">Submit</button>
                <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>