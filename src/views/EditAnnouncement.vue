<script setup>
import { getCategory,  updateAnnouncement,getAnnouncementByIddata } from '../assets/data.js'
import { onBeforeMount, onMounted, ref,computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
const { params } = useRoute()
const olddata = ref({})
const publishDate = ref(null)
const publishTime = ref(null)
const categoryAll = ref([])
const closeDate = ref(null)
const closeTime = ref(null)
const display = ref('')
const choosecategory = ref('')
const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
};
function createdate(data) {
    let dateStr= data;
    let [day, month, year] = dateStr.split("/");
    let years = parseInt(year) - 543
    year = years.toString()
    if (month.length === 1) {
        month = "0" + month
    }
    if (day.length === 1) {
        day = "0" + day
    }
    
    return year + "-" + month + "-" + day
}
function createtime(H,M) {
    let hour=H.toString()
    let min=M.toString()
    if (hour.length === 1) {
        hour = "0" + hour
    }
    if (min.length === 1) {
        min = "0" + min
    }
    
    return hour+":"+min
}
onBeforeMount(async () => {
    //get new announcement
    const receivedAnnouncement = ref()
    receivedAnnouncement.value = await getAnnouncementByIddata(params.id)
    for (const [key, value] of Object.entries(receivedAnnouncement.value)) {
        if (key.includes("publish") && value != null) {
             let date = new Date(value)
             let DATE =date.toLocaleDateString()
             let timeH= date.getHours()
             let timeM= date.getMinutes()
             publishDate.value=createdate(DATE)
             publishTime.value=createtime(timeH,timeM)
            // newAnnouncement.value[key] = createdate(date)
        }else if (key.includes("close") && value != null) {
            // let date = new Date(value).toLocaleString()
            // newAnnouncement.value[key] = createdate(date)
             let date = new Date(value)
             let DATE =date.toLocaleDateString()
             let timeH= date.getHours()
             let timeM= date.getMinutes()
             closeDate.value=createdate(DATE)
             closeTime.value=createtime(timeH,timeM)
        } 
         else if (key != "announcementID") {
            if (key.includes("category")) {
                choosecategory.value=value.categoryName
            }
            if (key.includes("Display")) {
                if(receivedAnnouncement.value.announcementDisplay=="Y"){
                   display.value=true
                }else{
                    display.value=false
                }
            }
            if(key !="category"){
                newAnnouncement.value[key] = value
            }
            
        }
    }
    //get category announcement
    const receivedCategory = ref([])
    receivedCategory.value = await getCategory()
    receivedCategory.value.forEach((data) => categoryAll.value.push(data))
    for (const [key, value] of Object.entries(receivedAnnouncement.value)) {
        olddata.value[key]=value
    }
})
const isDisabled = computed(() => {
    const checknewdata=()=>{
        let x = categoryAll.value.find((x) => x.categoryName === choosecategory.value)
        newAnnouncement.value.categoryId = x
        newAnnouncement.value.publishDate = convertDate(publishDate.value, publishTime.value)
        newAnnouncement.value.closeDate = convertDate(closeDate.value, closeTime.value)
        newAnnouncement.value.announcementDisplay = display.value == true ? 'Y' : 'N'
        const check=()=>{
            for (const [key, value] of Object.entries(olddata.value)) {
            if (key != "announcementID"){
                if(!key.includes('category')){
                    if(value!=newAnnouncement.value[key]){
                    return true
              }
                }
            
            }
        }
        return false
        }
        const checkcate=()=>{
            if(choosecategory.value!=0){
                if(olddata.value['category']!=undefined){
                 let oldcate=olddata.value['category'].categoryName
                 let newcate=newAnnouncement.value.categoryId.categoryName
                if(oldcate===newcate){
                    return false
                }else{
                    
                    return true
                }
            }
            }
        return false
        }
        let datacheck=check()
        let catecheck=checkcate()
        let id=newAnnouncement.value.categoryId.categoryID
        newAnnouncement.value.categoryId=id
        return !(datacheck || catecheck)
    }
    let titlenull=false
    let desnull=false
    if(newAnnouncement.value.announcementTitle.length==0){
        titlenull=true
    }
    if(newAnnouncement.value.announcementDescription.length==0){
        desnull=true
    }
    return checknewdata() || titlenull || desnull
})
const convertDate = (date, time) => {
    if (date === null) {
        return null
    } else {
        return new Date(date + "T" + (time === null ? '00:00' : time)).toISOString().replace(".000Z", "Z")
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

    console.log(newAnnouncement.value);
   await updateAnnouncement(newAnnouncement.value,params.id)
}
 function showdata (){
   ///show something\
 console.log(olddata.value);
}
</script>

<template>
    <div class="w-screen">
        <div class="w-full h-full items-center flex flex-col font-noto">
            <h1 class="font-extrabold text-3xl self-center my-4 ">Create Announcement</h1>
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
                    <select v-model="choosecategory" name="category" id="category-select"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                        <option value="0" disabled>Select a category</option>
                        <option v-for="item  in categoryAll" >
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
                        <input v-model="publishDate" type="date" placeholder="01/05/2023"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate">
                        <input :disabled="!publishDate" v-model="publishTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="publishDate">
                    </div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Close Date</label>
                    <div class="w-1/3 flex flex-row space-x-4">
                        <input v-model="closeDate" type="date" placeholder="01/05/2023"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate">
                        <input :disabled="!closeDate" v-model="closeTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4" id="closeDate">
                    </div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Display</label>
                    <div class="space-x-2">
                        <input v-model="display" type="checkbox" id="display"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4">
                        <label for="display" class="font-bold text-sm">Check to show this announcement</label>
                    </div>
                </div>
                <div class="w-full flex justify-start p-4 space-x-2">
                    <button :disabled="isDisabled"
                        class="px-4 py-2 rounded-md bg-green-500 text-white text-base font-bold disabled:bg-zinc-500"
                        @click="createanno()">Update</button>
                    <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="router.push('/admin/announcement')">Cancel</button>
                        <!-- <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="showdata()">show</button> -->
                        <!-- <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="createanno()">test</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>