<script setup>
import { getCategory, addAnnouncement } from '../assets/data.js'
import { onBeforeMount, onMounted, ref } from 'vue';

const category = ref([])
onMounted(async () => {
    const receivedData = ref([])
    receivedData.value = await getCategory()
    receivedData.value.forEach((data) => category.value.push(data))
})

const newAnnouncement = ref({
    announcementTitle: '',
    category: '',
    announcementDisplay: '',
    announcementDescription: '',
    publishDate: '',
    closeDate: ''
})
const createanno = async () => {
    
    let x = category.value.find((x) => x.categoryName === newAnnouncement.value.category)
    newAnnouncement.value.category = { categoryID: x.categoryID, categoryName: x.categoryName }
    let localDate = new Date(newAnnouncement.value.publishDate)
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString();
    newAnnouncement.value.publishDate = utcDate
    let localDate2 = new Date(newAnnouncement.value.closeDate)
    const utcDate2 = new Date(localDate2.getTime() + localDate2.getTimezoneOffset() * 60000).toISOString();
    newAnnouncement.value.closeDate = utcDate2
    await addAnnouncement(newAnnouncement.value)
}


</script>

<template>
    <div class="w-screen font-noto">
        <div class="w-full h-full flex justify-center text-custom-black">
            <div class="w-full flex flex-col items-center mt-10 space-y-4">
                <h1 class="font-semibold text-3xl max-md:text-2xl">Create New Announcement</h1>
                <div class="w-1/2 border rounded-md px-6 py-4 space-y-4 max-md:w-full">
                    <div class="w-full flex flex-col">
                        <label for="title" class="text-base font-bold">Announcement Title</label>
                        <input v-model="newAnnouncement.announcementTitle" type="text" id="title"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" placeholder="Learning Exchanging">
                    </div>
                    <div class="w-full flex flex-row space-x-2">
                        <div class="w-2/3 flex flex-col">
                            <label for="category-select" class="text-base font-bold">Category</label>
                            <select v-model="newAnnouncement.category" name="category" id="category-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option v-for="item in category">{{ item.categoryName }}</option>
                            </select>
                        </div>
                        <div class="w-1/3 flex flex-col">
                            <label for="display-select" class="text-base font-bold">Display</label>
                            <select v-model="newAnnouncement.announcementDisplay" name="display" id="display-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="description" class="text-base font-bold">Description</label>
                        <textarea v-model="newAnnouncement.announcementDescription" id="description"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4"
                            placeholder="Imagination is more important than knowledge...">
                        </textarea>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="publishDate" class="text-base font-bold">Publish Date</label>
                        <input pattern="MM-DD-YYYY HH:mm" type="datetime-local"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate"
                            v-model="newAnnouncement.publishDate">
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="closeDate" class="text-base font-bold">Close Date</label>
                        <input pattern="MM-DD-YYYY HH:mm" type="datetime-local"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate"
                            v-model="newAnnouncement.closeDate">
                    </div>
                </div>
                <div class="w-1/2 flex items-end justify-end max-md:w-full">
                    <button @click="createanno()" class="px-4 py-2 rounded-md bg-green-500 text-white text-lg">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>