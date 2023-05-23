<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getAnnouncementById } from '../assets/data.js'
import router from '../router/index.js'
import categoryico from '../components/icon/MdiListBox.vue'
import cdate from '../components/icon/TeenyiconsCalendarNoAccessOutline.vue'
import pdate from '../components/icon/TeenyiconsCalendarTickOutline.vue'
import views from '../components/icon/IcBaselineRemoveRedEye.vue'

const { params } = useRoute()
const announcement = ref('')
onBeforeMount(async () => {
    announcement.value = await getAnnouncementById(params.id)

})

const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
const dateformat = (date) => {
    if (date === null) {
        return "-"
    } else {
        let mydate = new Date(date)
        //  let timezone = mydate.getTimezoneOffset() * 60 * 1000;
        //   const localDate = new Date(mydate.getTime() - timezone);
        return mydate.toLocaleDateString('en-GB', options)
    }
}

</script>

<template>
    <div class="w-screen font-noto h-screen">
        <div v-if="announcement" class="w-full h-full  flex-row justify-center items-center">
            <div class="w-full flex justify-center bg-sky-600 pt-7 ">
                <div class="flex justify-start w-full items-center ">
                    <div class="w-full flex justify-center">
                        <span class="text-left text-3xl mb-4 text-white">Announcement Detail</span>
                    </div>
                </div>

            </div>
            <div class="w-full flex justify-center mt-10">
                <div class="border-2  flex justify-center items-center w-3/4 h-3/4 rounded-2xl  shadow-2xl">
                    <div class="ann-item w-full">
                        <div class="flex-row justify-start mt-3 pl-4 ">
                            <div class="flex text-white">
                                <span class="bg-emerald-400 flex rounded-3xl w-56 border">
                                    <pdate class="mt-1 ml-3"></pdate><span class="ann-publish-date ml-3"> {{
                                        dateformat(announcement.publishDate) }} </span>
                                </span>
                            </div>
                            <div class="flex text-white">
                                <span class="bg-red-400 flex rounded-3xl w-56 border">
                                    <cdate class="mt-1 ml-3"></cdate><span class="ann-close-date ml-4"></span> {{
                                        dateformat(announcement.closeDate) }}
                                </span>
                            </div>
                        </div>
                        <div class="text-2xl flex justify-end w-full pr-9 pt-5 -mt-16">
                            <span class="w-16 h-15 rounded-full ann-display text-center"
                                :class="announcement.announcementDisplay == 'Y' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'">{{
                                    announcement.announcementDisplay }}</span>
                        </div>
                        <div class="ann-category  flex justify-center -mt-6 text-xl"><span
                                class="bg-sky-400 flex rounded-3xl p-1 text-white">
                                <categoryico></categoryico><span>{{ announcement.announcementCategory }}</span>
                            </span></div>
                        <div class="text-3xl flex justify-center ann-title mt-4 overflow-x-auto">
                            <span>{{ announcement.announcementTitle }}</span>
                        </div>
                        <div
                            class="ann-description text-xl flex justify-center mt-10 h-96 overflow-y-auto bg-slate-200 rounded-2xl ql-editor">
                            <span class="mt-3" v-html="announcement.announcementDescription"></span>
                        </div>

                    </div>
                </div>
            </div>
            <div class=" fixed bottom-0 left-0 flex justify-between p-4 ">
                <button class=" rounded-md text-center text-lg bg-gray-200 my-2 w-20 h-10 text-custom-black ann-button  "
                    @click="router.go(-1)">Back</button>
            </div>
            <div class="fixed bottom-0 right-0 flex justify-between p-4">
                <router-link :to="{ path: `/admin/announcement/${params.id}/edit` }">
                    <button
                        class="rounded-md text-center text-lg  my-2 w-20 h-10 bg-sky-600 text-white ann-button hover:bg-sky-400">Edit</button>
                </router-link>
            </div>
            <div class=" fixed flex bottom-0  right-52 left-52  justify-center p-4 ann-counter ">
                <views class="mt-1 mr-3"></views>VIEW : {{ announcement.viewCount }}
            </div>
        </div>
        <div v-if="announcement === false" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div class="max-w-2xl p-6 w-96 shadow-xl overflow-y-auto flex flex-col items-center rounded-lg bg-red-600 text-white">
                <div class="flex items-center">
                    <img src="/icons/no-results.png" alt="" class="">
                </div>
                <div class="flex flex-col items-center justify-between my-2">
                    <p class="text-xl font-bold text-center">Announcement is not exist!</p>
                </div>
                <div class="mt-4 space-x-4">
                    <button
                        class="px-4 py-2 border border-red-400 bg-white text-red-400 rounded hover:bg-red-500 hover:text-white duration-100 font-bold"
                        @click="router.push('/admin/announcement')">
                        Okay!
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
tr {
    padding: 10px;
}

td {
    padding: 10px;
}


h1{

font-size: 2em;
}

h2{
    font-size: 1.5em;
}
h3{
    font-size: 1.5em;
}
h4{
    font-size: 1.17em;
}
h5{
    font-size: .83em;
}
h6{
    font-size: .67em;
}
</style>