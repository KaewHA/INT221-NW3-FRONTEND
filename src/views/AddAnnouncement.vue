<script setup>
import { getCategory, addAnnouncement } from '../assets/data.js'
import { onMounted, ref, computed } from 'vue';
import router from '../router/index.js'
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
const fillcurdatepb=ref(false)
const fillcurdatecl=ref(false)

const convertDate = (date, time,deftime) => {

if (date === null || date==="") {
    return null
} else {
    try{
        return new Date(date + "T" + (time === null ? deftime : time)).toISOString().replace(".000Z", "Z")
    }
    catch(error){
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

const isDisabled = computed(() => {
    const checkfill=()=>{
        const emptyValue = []
    for (const [key, value] of Object.entries(newAnnouncement.value)) {
        if (!key.includes('Date') && !key.includes('Display') && value == '') {
            emptyValue.push(key)
        }
    }
    return emptyValue.length > 0 ? true : false
    }
    const lencheck=()=>{
        if(newAnnouncement.value.announcementTitle.length>200){
            return true
        }
        if(newAnnouncement.value.announcementDescription.length>10000){
            return true
        }
        return false
    }
    const datecheckpb=()=>{
        if(publishDate.value!="" && publishDate.value!=null){
            let currentdate=Date.now()
            let mydate=new Date (convertDate(publishDate.value, publishTime.value,"06:00")).getTime()
            if(currentdate>mydate){
                fillcurdatepb.value=true
                return true
            }else{
                fillcurdatepb.value=false
            }
            return false
        }
    }
    const datecheckcl=()=>{
        console.log("sss");
        if(publishDate.value=="" || publishDate.value==null){
            if(closeDate.value!="" && closeDate.value!=null){
                let currentdate=Date.now()
                let mydate=new Date (convertDate(closeDate.value, closeTime.value,"18:00")).getTime()
                if(currentdate>mydate){
                 fillcurdatecl.value=true
                 return true
                }else{
                 fillcurdatecl.value=false  
                 return false
                }
            }
        }else{
            if(closeDate.value!="" && closeDate.value!=null){
                let currentdate=Date.now()
                let mydate=new Date (convertDate(closeDate.value, closeTime.value,"18:00")).getTime()
                let publishdd=new Date (convertDate(publishDate.value,publishTime.value,"06:00")).getTime()
                if(currentdate<mydate && mydate>publishdd){
                  fillcurdatecl.value=false
                  return false
                }else{
                 fillcurdatecl.value=true  
                 return true
                }
            }
        }
        return false
    }
    if(publishDate.value!=null && publishDate.value!=""){
        publishTime.value="06:00"
    }
    if(closeDate.value!=null && closeDate.value!=""){
        closeTime.value="18:00"
    }
    return checkfill() || lencheck()||datecheckpb() || datecheckcl()
   // return checkfill()
})

const addnewdata = async () => {
    newAnnouncement.value.publishDate = convertDate(publishDate.value, publishTime.value)
    newAnnouncement.value.closeDate = convertDate(closeDate.value, closeTime.value)
    newAnnouncement.value.announcementDisplay = display.value == true ? 'Y' : 'N'
    // let id=newAnnouncement.value.category.categoryID
    // delete newAnnouncement.value.category
    // newAnnouncement.value.categoryId=id
    await addAnnouncement(newAnnouncement.value)
}
function clearcd (){
    closeDate.value=""
   if(closeTime!=null ||closeTime!=""){
    closeTime.value=""
   }
}

function clearpd (){
   publishDate.value=""
   if(publishTime!=null ||publishTime!=""){
    publishTime.value=""
   }
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
                    <input v-model="newAnnouncement.announcementTitle" type="text" id="title" maxlength="200"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-title" placeholder="Learning Exchanging">
                        <p class="flex justify-end">{{ newAnnouncement.announcementTitle.length }}/200</p>
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
                    
                    <textarea v-model="newAnnouncement.announcementDescription" maxlength="10000" rows="10" id="description"
                        class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-description"
                        placeholder="Imagination is more important than knowledge...">
                </textarea>
                <p class="flex justify-end">{{ newAnnouncement.announcementDescription.length }}/10000</p>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Publish Date</label>
                    <div class="w-1/3 flex flex-row space-x-4">
                        <input v-model="publishDate" type="date" placeholder="01/05/2023"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-publish-date" id="publishDate">
                        <input :disabled="!publishDate" v-model="publishTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-publish-time" id="publishDate">
                            <button :disabled="!publishDate" class="px-4 py-2 rounded-md bg-orange-400 text-white text-base font-bold disabled:hidden" @click="clearpd()">clear</button>
                    </div>
                    <div class="text-red-500 ml-3" v-show="fillcurdatepb" >Please enter a future date</div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Close Date</label>
                    <div class="w-1/3 flex flex-row space-x-4">
                        <input v-model="closeDate" type="date" placeholder="01/05/2023"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-date " id="closeDate">
                        <input :disabled="!closeDate" v-model="closeTime" type="time" placeholder="12:30"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-close-time" id="closeDate">
                            <button :disabled="!closeDate" class="px-4 py-2 rounded-md bg-orange-400 text-white text-base font-bold disabled:hidden" @click="clearcd()">clear</button>
                            
                    </div>
                    <div class="text-red-500 ml-3" v-show="fillcurdatecl" >Please enter a future date2</div>
                </div>
                <div class="flex flex-col w-full px-4 py-2 space-y-1">
                    <label class="text-base font-bold">Display</label>
                    <div class="space-x-2">
                        <input v-model="display" type="checkbox" id="display"
                            class="border rounded-md bg-slate-100 text-lg py-2 px-4 ann-display">
                        <label for="display" class="font-bold text-sm">Check to show this announcement</label>
                    </div>
                </div>
                <div class="w-full flex justify-start p-4 space-x-2">
                    <button :disabled="isDisabled"
                        class="px-4 py-2 rounded-md bg-green-500 text-white text-base font-bold disabled:bg-zinc-500 ann-button"
                        @click="addnewdata()">submit</button>
                    <button class="px-4 py-2 rounded-md bg-red-500 text-white text-base font-bold"
                        @click="router.push('/admin/announcement')">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>