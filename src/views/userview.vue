<script setup>
import { ref, onBeforeMount,computed } from "vue";
import { getuserAnnouncement} from "../assets/data.js";
import router from '../router/index.js'
const totalpage=ref(0)
const setofpage=computed(() => {
    let preset= [1,2,3,4,5,6,7,8,9,10]
    if(currentpage.value>10 ){
        let newx=[]
       preset.forEach((x)=>newx.push(x+(currentpage.value-10)))
       console.log(newx[newx.length-1]);
       if(newx[newx.length-1] <=totalpage.value){
        preset=newx
       }else{

       }
       
    }
     return preset

})
const currentpage=ref(0)
onBeforeMount(async () => {
    const receivedData = ref([]);
    receivedData.value = await getuserAnnouncement(0);
    console.log(receivedData.value);
    receivedData.value.content.forEach((x) => allAnnouncement.value.push(x));
     totalpage.value=receivedData.value.totalPages
     currentpage.value=receivedData.value.page+1
});

const allAnnouncement = ref([]);
const goToPage=async(page)=>{
    allAnnouncement.value=[]
    const receivedData = ref([]);
    receivedData.value = await getuserAnnouncement(page);
    receivedData.value.content.forEach((x) => allAnnouncement.value.push(x));
     totalpage.value=receivedData.value.totalPages
     currentpage.value=receivedData.value.page+1
}



const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<template>
    <div class="w-screen">
        <div class="w-full flex justify-center">
            <div v-if="allAnnouncement.length != 0" class="font-noto w-full p-8">
                <div class="w-full flex flex-row justify-between mt-2 mb-3">
                    <h1 class="text-custom-black">
                        <span class="font-bold">Date/Time Show in Timezone :</span>
                        {{ timezoneName }}
                    </h1>
                    <button class="rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button" @click="">Closed Announcement</button>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <table class="w-full border ">
                        <tr class="sticky top-0 bg-cyan-600 border text-white">
                            <th class="text-left">No.</th>
                            <th class="text-left pr-6">Title</th>
                            <th class="text-left">Category</th>
                        </tr>
                        <tr v-for="(announcement, index) in allAnnouncement" :key="index" class="overflow-auto ann-item" :class="index%2!==0?'bg-slate-50':'bg-white'">
                            <td class="">
                                {{ index + 1 }}
                            </td>
                            <td class="ann-title">
                                {{ announcement.announcementTitle }}
                            </td>
                            <td class="ann-category">
                                {{ announcement.announcementCategory }}
                            </td>
                        </tr>
                    </table>
                    <div class="mt-5 flex">
                        <button class="rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button">Prev</button>
                        <div class="pagination">
                               <button v-for="value in setofpage" @click="goToPage(value)" class="rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button">
                                    {{ value }}
                                </button>
                                  </div>
                        <button class="rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 ann-button">Next</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 class="mt-2 mb-3 ml-6 text-custom-black">
                    <span class="font-bold ">Date/Time Show in Timezone :</span>
                    {{ timezoneName }}
                </h1>
                <h1 class="text-4xl flex w-full items-center justify-center font-noto">
                    No Announcements
                </h1>
            </div>
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