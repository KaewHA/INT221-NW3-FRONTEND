<script setup>
import Navbar from '../components/Navbar.vue';
import { getCategory } from '../assets/data.js'
import { onBeforeMount, onMounted, ref } from 'vue';

const category = ref([])
onMounted(async () => {
    const receivedData = ref([])
    receivedData.value = await getCategory()
    receivedData.value.forEach((data) => category.value.push(data))
})

const newAnnouncement = ref({
    title: '',
    category: '',
    display: '',
    description: '',
    publishDate:'',
    closeDate:''
})

console.log(newAnnouncement.value);
</script>

<template>
    <div class="w-screen h-screen font-noto">
        <Navbar></Navbar>
        <div class="w-full h-full flex justify-center text-custom-black">
            <div class="text-3xl w-full flex flex-col items-center mt-10 space-y-4">
                <h1 class="font-semibold">Create New Announcement</h1>
                <div class="w-1/2 border rounded-md px-6 py-4 space-y-4">
                    <div class="w-full flex flex-col">
                        <label for="title" class="text-base font-bold">Announcement Title</label>
                        <input v-model="newAnnouncement.title" type="text" id="title"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" placeholder="Learning Exchanging">
                    </div>
                    <div class="w-full flex flex-row space-x-2">
                        <div class="w-2/3 flex flex-col">
                            <label for="category-select" class="text-base font-bold">Category</label>
                            <select v-model="newAnnouncement.category" name="category" id="category-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option v-for="item in category" value="">{{ item.categoryName }}</option>
                            </select>
                        </div>
                        <div class="w-1/3 flex flex-col">
                            <label for="display-select" class="text-base font-bold">Display</label>
                            <select v-model="newAnnouncement.display" name="display" id="display-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option value="">Yes</option>
                                <option value="">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="description" class="text-base font-bold">Description</label>
                        <textarea v-model="newAnnouncement.description" id="description"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" 
                            placeholder="Imagination is more important than knowledge...">
                        </textarea>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="publishDate" class="text-base font-bold">Publish Date</label>
                        <input  pattern="MM-DD-YYYY HH:mm" type="datetime-local" class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate" v-model="newAnnouncement.publishDate">
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="closeDate" class="text-base font-bold">Close Date</label>
                        <input  pattern="MM-DD-YYYY HH:mm" type="datetime-local" class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate" v-model="newAnnouncement.closeDate">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>