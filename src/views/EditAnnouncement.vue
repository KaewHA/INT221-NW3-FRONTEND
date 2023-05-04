<script setup>
import { getCategory,getAnnouncementById ,updateAnnouncement} from '../assets/data.js'
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
const { params } = useRoute()
const category = ref([])
onBeforeMount(async () => {
    //get edit announcement
    const receivedAnnouncement = ref()
    receivedAnnouncement.value = await getAnnouncementById(params.id)
    for (const [key, value] of Object.entries(receivedAnnouncement.value)) {
        if(key.includes("Date") && value != null) {
            editAnnouncement.value[key] = value.slice(0, 16)
            console.log(editAnnouncement.value[key]);
        } else if(key != "id") {
            if (key.includes("Category")) {
                editAnnouncement.value["category"] = value
            }
            editAnnouncement.value[key] = value
        }
    }
    //get category announcement
    const receivedCategory = ref([])
    receivedCategory.value = await getCategory()
    receivedCategory.value.forEach((data) => category.value.push(data))
})

const editAnnouncement = ref({
    announcementTitle: '',
    category: '',
    announcementDisplay: '',
    announcementDescription: '',
    publishDate:'',
    closeDate:''
})

console.log(editAnnouncement.value)

const createanno=async()=>{
    let x=category.value.find((x)=>x.categoryName===newAnnouncement.value.category)
    newAnnouncement.value.category= {categoryID:x.categoryID,categoryName:x.categoryName}
    let localDate=new Date(newAnnouncement.value.publishDate)
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString();
    newAnnouncement.value.publishDate=utcDate
    let localDate2=new Date(newAnnouncement.value.closeDate)
    const utcDate2 = new Date(localDate2.getTime() + localDate2.getTimezoneOffset() * 60000).toISOString();
    newAnnouncement.value.closeDate=utcDate2
    await updateAnnouncement(newAnnouncement.value,params.id)
}
</script>

<template>
    <div class="w-screen h-screen font-noto">
        <div class="w-full h-full flex justify-center text-custom-black">
            <div class="text-3xl w-full flex flex-col items-center mt-10 space-y-4">
                <h1 class="font-semibold">Edit Announcement</h1>
                <div class="w-1/2 border rounded-md px-6 py-4 space-y-4">
                    <div class="w-full flex flex-col">
                        <label for="title" class="text-base font-bold">Announcement Title</label>
                        <input v-model="editAnnouncement.announcementTitle" type="text" id="title"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" placeholder="Learning Exchanging">
                    </div>
                    <div class="w-full flex flex-row space-x-2">
                        <div class="w-2/3 flex flex-col">
                            <label for="category-select" class="text-base font-bold">Category</label>
                            <select v-model="editAnnouncement.category" name="category" id="category-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option v-for="item in category" >{{ item.categoryName }}</option>
                            </select>
                        </div>
                        <div class="w-1/3 flex flex-col">
                            <label for="display-select" class="text-base font-bold">Display</label>
                            <select v-model="editAnnouncement.announcementDisplay" name="display" id="display-select"
                                class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="description" class="text-base font-bold">Description</label>
                        <textarea v-model="editAnnouncement.announcementDescription" id="description"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" 
                            placeholder="Imagination is more important than knowledge...">
                        </textarea>
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="publishDate" class="text-base font-bold">Publish Date</label>
                        <input  pattern="MM-DD-YYYY HH:mm" type="datetime-local" class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate" v-model="editAnnouncement.publishDate">
                    </div>
                    <div class="w-full flex flex-col">
                        <label for="closeDate" class="text-base font-bold">Close Date</label>
                        <input  pattern="MM-DD-YYYY HH:mm" type="datetime-local" class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate" v-model="editAnnouncement.closeDate">
                    </div>
                </div>
                <div class="flex  ">
                    <button @click="createanno()" class="px-4 py-2 rounded-md bg-sky-600 text-white text-base font-bold mr-6">Update</button>
                <button @click="router.push(`/admin/announcement/${params.id}`)" class="px-4 py-2 rounded-md bg-zinc-500 text-white text-base font-bold" >Cancel</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>