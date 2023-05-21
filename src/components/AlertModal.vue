<script setup>
import router from '../router';

const props = defineProps({
    action: String,
    status: Boolean

})

defineEmits(['changeToggle', 'deleteAnnouncement'])

</script>
<template>
    <div class="inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 absolute">
        <div class="max-w-2xl p-6 w-96 bg-white shadow-xl flex items-center flex-col rounded-lg">
            <div class="flex items-center">
                <img v-if="props.status !== false" src="/icons/success.svg" alt="">
                <img v-else src="/icons/error.svg" alt="">
            </div>
            <div class="flex items-center justify-between my-2">
                <h3 v-if="props.action==='add' && props.status !== false" class="text-2xl text-center">Add Announcement Success!</h3>
                <h3 v-else-if="props.status === false && props.action === 'add'" class="text-2xl text-center">Error, cannot add announcement!</h3>
                <h3 v-else-if="props.action === 'edit' && props.status !== false" class="text-2xl text-center">Edit Announcement Success!</h3>
                <h3 v-else-if="props.status === false && props.action === 'edit'" class="text-2xl text-center">Error, cannot edit announcement!</h3>
            </div>
            <div class="mt-4 flex items-center">
                <button class="px-4 py-2 border border-emerald-500 bg-white text-emerald-500 rounded hover:bg-emerald-500 hover:text-white duration-100 font-bold" @click="$emit('changeToggle');router.push('/admin/announcement')">
                    Okay!
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>